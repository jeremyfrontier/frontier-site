/* Work Review Builder: tiny .xlsx writer.
 * No dependencies (site rule: no third party requests at runtime).
 * Builds one styled worksheet with formulas and conditional formatting,
 * zipped with the STORE method. Exposes window.WorkReviewXlsx.build(model).
 */
(function () {
  'use strict';

  var MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  var FIRST_MONTH_COL = 3;   /* C */
  var YEAR_COL = 15;         /* O */
  var HEADER_ROW = 5;

  /* Style ids, matching cellXfs order in stylesXml() */
  var S = { title: 1, objective: 2, sub: 3, head: 4, band: 5, metric: 6, meta: 7,
    target: { num: 8, money: 9, pct: 10, avg: 11 }, month: { num: 12, money: 13, pct: 14, avg: 15 },
    year: { num: 29, money: 30, pct: 31, avg: 32 }, foot: 20, headLeft: 21,
    chip: [22, 23, 24], tint: [25, 26, 27], ytdHead: 28, brand: 33, link: 34 };

  /* Category color families from the Frontier palette, lightest to darkest. Year to Date and this month's header use the accent. */
  var THEMES = {
    ink:   { chip: ['D9CFCA', 'A79B95', '2C2C2C'], light: [true, true, false], tint: ['FAF7F5', 'F4EFEC', 'ECE6E2'], ytd: 'EC5B59', ytdTint: 'FEF0EF', month: 'EC5B59' },
    coral: { chip: ['F7B9B8', 'EC5B59', '8A2124'], light: [true, false, false], tint: ['FEF8F7', 'FEF0EF', 'F8E6E6'], ytd: '2C2C2C', ytdTint: 'F4EFEC', month: 'EC5B59' },
    green: { chip: ['B9D8C0', '4E9463', '0A5A12'], light: [true, false, false], tint: ['F3F8F4', 'EAF3EC', 'E0EDE3'], ytd: 'EC5B59', ytdTint: 'FEF0EF', month: 'EC5B59' }
  };

  function esc(s) {
    return String(s === undefined || s === null ? '' : s)
      .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')
      .replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F]/g, '');
  }
  function col(n) { var s = ''; while (n > 0) { var m = (n - 1) % 26; s = String.fromCharCode(65 + m) + s; n = Math.floor((n - 1) / 26); } return s; }
  function ref(c, r) { return col(c) + r; }

  function strCell(c, r, text, style) {
    return '<c r="' + ref(c, r) + '" s="' + style + '" t="inlineStr"><is><t xml:space="preserve">' + esc(text) + '</t></is></c>';
  }
  function numCell(c, r, value, style) {
    return '<c r="' + ref(c, r) + '" s="' + style + '"><v>' + value + '</v></c>';
  }
  function blankCell(c, r, style) { return '<c r="' + ref(c, r) + '" s="' + style + '"/>'; }
  function fCell(c, r, formula, style) {
    return '<c r="' + ref(c, r) + '" s="' + style + '"><f>' + esc(formula) + '</f></c>';
  }
  function row(r, cells, height) {
    return '<row r="' + r + '"' + (height ? ' ht="' + height + '" customHeight="1"' : '') + '>' + cells.join('') + '</row>';
  }
  function kind(m) { return m.fmt === '%' ? 'pct' : m.money ? 'money' : (m.yearly === 'a' ? 'avg' : 'num'); }

  function headerRow() {
    var r = HEADER_ROW, cells = [strCell(1, r, 'Metric', S.headLeft), strCell(2, r, 'Monthly Target', S.ytdHead)];
    MONTHS.forEach(function (m, i) { cells.push(strCell(FIRST_MONTH_COL + i, r, m, S.head)); });
    cells.push(strCell(YEAR_COL, r, 'Year to Date', S.ytdHead));
    return row(r, cells, 22);
  }

  /* Green when the month hits the Monthly Target (at or above, or at or below when lower is good), red when it misses. */
  function rules(m, r, prio) {
    var first = ref(FIRST_MONTH_COL, r), span = first + ':' + ref(FIRST_MONTH_COL + 11, r), B = '$B' + r;
    var has = 'ISNUMBER(' + first + '),ISNUMBER(' + B + '),';
    var rule = function (dxf, f) {
      return '<cfRule type="expression" dxfId="' + dxf + '" priority="' + (prio.n++) + '" stopIfTrue="1"><formula>' + esc(f) + '</formula></cfRule>';
    };
    return '<conditionalFormatting sqref="' + span + '">' +
      rule(0, 'AND(' + has + first + (m.lower ? '<=' : '>=') + B + ')') + rule(1, 'AND(' + has + 'TRUE)') + '</conditionalFormatting>';
  }

  function sheetXml(model) {
    var rows = [], merges = [], cf = [], r = 1, prio = { n: 1 };
    var lastCol = col(YEAR_COL);
    rows.push(row(r, [strCell(1, r, model.org || model.name, S.title)], 30)); merges.push('A1:' + lastCol + '1'); r++;
    rows.push(row(r, [strCell(1, r, 'Annual Objective: ' + (model.objective || 'Not set yet'), S.objective)], 36)); merges.push('A2:' + lastCol + '2'); r++;
    rows.push(row(r, [strCell(1, r, model.year + ' Work Review  |  Built with the Work Review Builder at thefrontiergroup.co/workreview', S.sub)])); merges.push('A3:' + lastCol + '3'); r++;
    rows.push(headerRow());
    r = HEADER_ROW + 1;

    model.functions.forEach(function (fn, fi) {
      var band = [strCell(1, r, fn.name, S.chip[fi])];
      for (var c = 2; c <= YEAR_COL; c++) band.push(blankCell(c, r, S.tint[fi]));
      rows.push(row(r, band, 20)); r++;
      fn.metrics.forEach(function (m) {
        var k = kind(m);
        var cells = [strCell(1, r, m.label + (m.lower ? '  (on target at or below)' : ''), S.metric)];
        cells.push(m.target === null ? blankCell(2, r, S.target[k]) : numCell(2, r, m.target, S.target[k]));
        for (var i = 0; i < 12; i++) cells.push(blankCell(FIRST_MONTH_COL + i, r, S.month[k]));
        var span = ref(FIRST_MONTH_COL, r) + ':' + ref(FIRST_MONTH_COL + 11, r);
        var agg = m.yearly === 'a' ? 'AVERAGE' : 'SUM';
        cells.push(fCell(YEAR_COL, r, 'IF(COUNT(' + span + ')=0,"",' + agg + '(' + span + '))', S.year[k]));
        rows.push(row(r, cells, 20));
        cf.push(rules(m, r, prio));
        r++;
      });
    });
    r++;
    model.notes.forEach(function (n) { rows.push(row(r, [strCell(1, r, n, S.foot)], n.length > 120 ? 30 : 16)); merges.push('A' + r + ':' + lastCol + r); r++; });
    r++;
    var brand = [strCell(1, r, 'FRONTIER GROUP   |   More tools for running a healthy team', S.brand)];
    for (var bc = 2; bc <= YEAR_COL; bc++) brand.push(blankCell(bc, r, S.brand));
    rows.push(row(r, brand, 24)); merges.push('A' + r + ':' + lastCol + r); r++;
    var links = [];
    (model.links || []).forEach(function (l) {
      rows.push(row(r, [strCell(1, r, l[0], S.link)], 18)); links.push({ ref: 'A' + r, url: l[1] }); r++;
    });
    model._links = links;
    var headCf = '<conditionalFormatting sqref="' + ref(FIRST_MONTH_COL, HEADER_ROW) + ':' + ref(FIRST_MONTH_COL + 11, HEADER_ROW) + '">' +
      '<cfRule type="expression" dxfId="2" priority="' + (prio.n++) + '"><formula>' + esc('MONTH(TODAY())=COLUMN(' + ref(FIRST_MONTH_COL, HEADER_ROW) + ')-' + (FIRST_MONTH_COL - 1)) + '</formula></cfRule></conditionalFormatting>';
    cf.push(headCf);

    var cols = '<cols><col min="1" max="1" width="42" customWidth="1"/><col min="2" max="2" width="15" customWidth="1"/>' +
      '<col min="3" max="14" width="10" customWidth="1"/><col min="15" max="15" width="13" customWidth="1"/></cols>';
    var view = '<sheetViews><sheetView workbookViewId="0" showGridLines="0"><pane xSplit="1" ySplit="' + HEADER_ROW +
      '" topLeftCell="B' + (HEADER_ROW + 1) + '" activePane="bottomRight" state="frozen"/></sheetView></sheetViews>';
    return '<?xml version="1.0" encoding="UTF-8" standalone="yes"?>' +
      '<worksheet xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main" xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships">' +
      '<sheetPr><pageSetUpPr fitToPage="1"/></sheetPr>' + view + '<sheetFormatPr defaultRowHeight="16"/>' + cols + '<sheetData>' + rows.join('') + '</sheetData>' +
      '<mergeCells count="' + merges.length + '">' + merges.map(function (m) { return '<mergeCell ref="' + m + '"/>'; }).join('') + '</mergeCells>' +
      cf.join('') + (links.length ? '<hyperlinks>' + links.map(function (l, i) { return '<hyperlink ref="' + l.ref + '" r:id="rIdL' + (i + 1) + '"/>'; }).join('') + '</hyperlinks>' : '') + '<pageMargins left="0.5" right="0.5" top="0.6" bottom="0.6" header="0.3" footer="0.3"/>' +
      '<pageSetup orientation="landscape" fitToWidth="1" fitToHeight="0"/></worksheet>';
  }

  function stylesXml(t) {
    var fmts = '<numFmts count="3"><numFmt numFmtId="164" formatCode="&quot;$&quot;#,##0"/><numFmt numFmtId="165" formatCode="#,##0.0"/><numFmt numFmtId="166" formatCode="0%"/></numFmts>';
    var fonts = '<fonts count="9">' +
      '<font><sz val="11"/><color rgb="FF2C2C2C"/><name val="Arial"/></font>' +
      '<font><b/><sz val="11"/><color rgb="FF2C2C2C"/><name val="Arial"/></font>' +
      '<font><b/><sz val="20"/><color rgb="FF2C2C2C"/><name val="Arial"/></font>' +
      '<font><sz val="12"/><color rgb="FF2C2C2C"/><name val="Arial"/></font>' +
      '<font><b/><sz val="11"/><color rgb="FFFFFFFF"/><name val="Arial"/></font>' +
      '<font><i/><sz val="10"/><color rgb="FF6A625E"/><name val="Arial"/></font>' +
      '<font><b/><sz val="11"/><color rgb="FFC94442"/><name val="Arial"/></font>' +
      '<font><u/><sz val="11"/><color rgb="FFC94442"/><name val="Arial"/></font>' +
      '<font><b/><sz val="12"/><color rgb="FFFFFFFF"/><name val="Arial"/></font></fonts>';
    var solid = function (hex) { return '<fill><patternFill patternType="solid"><fgColor rgb="FF' + hex + '"/><bgColor indexed="64"/></patternFill></fill>'; };
    var extra = t.chip.concat(t.tint, [t.ytd, t.ytdTint]);   /* fills 4 to 11 */
    var fills = '<fills count="' + (4 + extra.length) + '"><fill><patternFill patternType="none"/></fill><fill><patternFill patternType="gray125"/></fill>' +
      solid('2C2C2C') + solid('FEF0EF') + extra.map(solid).join('') + '</fills>';
    var borders = '<borders count="2"><border><left/><right/><top/><bottom/><diagonal/></border>' +
      '<border><left/><right/><top/><bottom style="thin"><color rgb="FFE4DBD7"/></bottom><diagonal/></border></borders>';
    var al = function (h, wrap) { return '<alignment horizontal="' + h + '" vertical="center"' + (wrap ? ' wrapText="1"' : '') + '/>'; };
    var xf = function (fmt, font, fill, border, align) {
      return '<xf numFmtId="' + fmt + '" fontId="' + font + '" fillId="' + fill + '" borderId="' + border + '" xfId="0"' +
        (fmt ? ' applyNumberFormat="1"' : '') + ' applyFont="1" applyFill="1" applyBorder="1" applyAlignment="1">' + align + '</xf>';
    };
    var units = [3, 164, 166, 165];
    var xfs = [
      '<xf numFmtId="0" fontId="0" fillId="0" borderId="0" xfId="0"/>',
      xf(0, 2, 0, 0, al('left')), xf(0, 3, 0, 0, al('left', true)), xf(0, 5, 0, 0, al('left')),
      xf(0, 4, 2, 0, al('center')), xf(0, 6, 3, 0, al('left')),
      xf(0, 0, 0, 1, al('left', true)), xf(0, 5, 0, 1, al('center'))
    ];
    units.forEach(function (u) { xfs.push(xf(u, 1, 11, 1, al('center'))); });   /* 8 to 11 monthly target, same look as Year to Date */
    units.forEach(function (u) { xfs.push(xf(u, 0, 0, 1, al('center'))); });
    units.forEach(function (u) { xfs.push(xf(u, 1, 3, 1, al('center'))); });
    xfs.push(xf(0, 5, 0, 0, al('left', true)));                 /* 20 foot */
    xfs.push(xf(0, 4, 2, 0, al('left')));                       /* 21 headLeft */
    [0, 1, 2].forEach(function (i) { xfs.push(xf(0, t.light[i] ? 1 : 4, 4 + i, 0, al('left'))); });   /* 22 to 24 chip */
    [0, 1, 2].forEach(function (i) { xfs.push(xf(0, 1, 7 + i, 0, al('left'))); });                   /* 25 to 27 tint */
    xfs.push(xf(0, 4, 10, 0, al('center')));                    /* 28 ytd head */
    units.forEach(function (u) { xfs.push(xf(u, 1, 11, 1, al('center'))); });   /* 29 to 32 ytd cells */
    xfs.push(xf(0, 8, 10, 0, al('left')));                      /* 33 brand band, accent */
    xfs.push(xf(0, 7, 0, 0, al('left')));                       /* 34 link */
    var dxfs = '<dxfs count="3">' +
      '<dxf><font><color rgb="FF1E5E3A"/></font><fill><patternFill><bgColor rgb="FFD9EFDF"/></patternFill></fill></dxf>' +
      '<dxf><font><color rgb="FF8A1F1F"/></font><fill><patternFill><bgColor rgb="FFF8D7D7"/></patternFill></fill></dxf>' +
      '<dxf><font><b/><color rgb="FFFFFFFF"/></font><fill><patternFill><bgColor rgb="FF' + t.month + '"/></patternFill></fill></dxf></dxfs>';
    return '<?xml version="1.0" encoding="UTF-8" standalone="yes"?>' +
      '<styleSheet xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main">' + fmts + fonts + fills + borders +
      '<cellStyleXfs count="1"><xf numFmtId="0" fontId="0" fillId="0" borderId="0"/></cellStyleXfs>' +
      '<cellXfs count="' + xfs.length + '">' + xfs.join('') + '</cellXfs>' +
      '<cellStyles count="1"><cellStyle name="Normal" xfId="0" builtinId="0"/></cellStyles>' + dxfs + '</styleSheet>';
  }

  function parts(model) {
    var X = '<?xml version="1.0" encoding="UTF-8" standalone="yes"?>';
    return [
      ['[Content_Types].xml', X + '<Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types">' +
        '<Default Extension="rels" ContentType="application/vnd.openxmlformats-package.relationships+xml"/>' +
        '<Default Extension="xml" ContentType="application/xml"/>' +
        '<Override PartName="/xl/workbook.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet.main+xml"/>' +
        '<Override PartName="/xl/worksheets/sheet1.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.worksheet+xml"/>' +
        '<Override PartName="/xl/styles.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.styles+xml"/></Types>'],
      ['_rels/.rels', X + '<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">' +
        '<Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/officeDocument" Target="xl/workbook.xml"/></Relationships>'],
      ['xl/workbook.xml', X + '<workbook xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main" xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships">' +
        '<sheets><sheet name="Work Review" sheetId="1" r:id="rId1"/></sheets><calcPr calcId="191029" fullCalcOnLoad="1"/></workbook>'],
      ['xl/_rels/workbook.xml.rels', X + '<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">' +
        '<Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/worksheet" Target="worksheets/sheet1.xml"/>' +
        '<Relationship Id="rId2" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/styles" Target="styles.xml"/></Relationships>'],
      ['xl/styles.xml', stylesXml(THEMES[model.theme] || THEMES.ink)],
      ['xl/worksheets/sheet1.xml', sheetXml(model)],
      ['xl/worksheets/_rels/sheet1.xml.rels', X + '<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">' +
        (model._links || []).map(function (l, i) {
          return '<Relationship Id="rIdL' + (i + 1) + '" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/hyperlink" Target="' + esc(l.url) + '" TargetMode="External"/>';
        }).join('') + '</Relationships>']
    ];
  }

  /* ---------- zip (STORE, no compression) ---------- */
  var CRC = (function () { var t = [], c; for (var n = 0; n < 256; n++) { c = n; for (var k = 0; k < 8; k++) c = c & 1 ? 0xEDB88320 ^ (c >>> 1) : c >>> 1; t[n] = c >>> 0; } return t; })();
  function crc32(b) { var c = 0xFFFFFFFF; for (var i = 0; i < b.length; i++) c = CRC[(c ^ b[i]) & 0xFF] ^ (c >>> 8); return (c ^ 0xFFFFFFFF) >>> 0; }
  function zip(files) {
    var enc = new TextEncoder(), chunks = [], central = [], offset = 0;
    var d = new Date(), time = (d.getHours() << 11) | (d.getMinutes() << 5) | (d.getSeconds() >> 1);
    var date = ((d.getFullYear() - 1980) << 9) | ((d.getMonth() + 1) << 5) | d.getDate();
    files.forEach(function (f) {
      var name = enc.encode(f[0]), data = enc.encode(f[1]), crc = crc32(data);
      var h = new DataView(new ArrayBuffer(30));
      h.setUint32(0, 0x04034b50, true); h.setUint16(4, 20, true); h.setUint16(6, 0x0800, true); h.setUint16(8, 0, true);
      h.setUint16(10, time, true); h.setUint16(12, date, true); h.setUint32(14, crc, true);
      h.setUint32(18, data.length, true); h.setUint32(22, data.length, true); h.setUint16(26, name.length, true); h.setUint16(28, 0, true);
      chunks.push(new Uint8Array(h.buffer), name, data);
      var c = new DataView(new ArrayBuffer(46));
      c.setUint32(0, 0x02014b50, true); c.setUint16(4, 20, true); c.setUint16(6, 20, true); c.setUint16(8, 0x0800, true); c.setUint16(10, 0, true);
      c.setUint16(12, time, true); c.setUint16(14, date, true); c.setUint32(16, crc, true); c.setUint32(20, data.length, true);
      c.setUint32(24, data.length, true); c.setUint16(28, name.length, true); c.setUint32(42, offset, true);
      central.push(new Uint8Array(c.buffer), name);
      offset += 30 + name.length + data.length;
    });
    var size = central.reduce(function (s, a) { return s + a.length; }, 0);
    var e = new DataView(new ArrayBuffer(22));
    e.setUint32(0, 0x06054b50, true); e.setUint16(8, files.length, true); e.setUint16(10, files.length, true);
    e.setUint32(12, size, true); e.setUint32(16, offset, true);
    var all = chunks.concat(central, [new Uint8Array(e.buffer)]);
    var total = all.reduce(function (s, a) { return s + a.length; }, 0), out = new Uint8Array(total), p = 0;
    all.forEach(function (a) { out.set(a, p); p += a.length; });
    return out;
  }

  function toBase64(bytes) {
    var s = '', step = 0x8000;
    for (var i = 0; i < bytes.length; i += step) s += String.fromCharCode.apply(null, bytes.subarray(i, i + step));
    return btoa(s);
  }

  window.WorkReviewXlsx = {
    build: function (model) {
      var bytes = zip(parts(model));
      return { bytes: bytes, base64: toBase64(bytes),
        blob: new Blob([bytes], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' }) };
    }
  };
})();

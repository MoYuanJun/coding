/**
 * 合并多个 PDF 为一个 PDF 文件
 * 这个是使用的 pdf-lib 对 PDF 进行合并
 */
const { PDFDocument } = require('pdf-lib');
const fs = require('fs');

const mergePDF = async ({ sourceFiles, outputFile }) => {
  const pdfDoc = await PDFDocument.create();

  for (let i = 0; i < sourceFiles.length; i += 1) {
    const localPath = sourceFiles[i];
    const PDFItem = await PDFDocument.load(fs.readFileSync(localPath));

    for (let j = 0;j < PDFItem.getPageCount(); j += 1) {
      const [PDFPageItem] = await pdfDoc.copyPages(PDFItem, [j]);
      pdfDoc.addPage(PDFPageItem);
    }
  }

  const pdfBytes = await pdfDoc.save();
  fs.writeFileSync(outputFile || 'merge.pdf', pdfBytes);
};

const sourceFiles = ['./1.pdf', './2.pdf'];
mergePDF({ sourceFiles });

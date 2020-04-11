

import { PDFDocument, StandardFonts } from 'pdf-lib'
import QRCode from 'qrcode'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faEye, faFilePdf } from '@fortawesome/free-solid-svg-icons'

import pdfBase from './certificate.pdf'

library.add(faEye, faFilePdf)



const generateQR = async text => {
  try {
    var opts = {
      errorCorrectionLevel: 'M',
      type: 'image/png',
      quality: 0.92,
      margin: 1,
    }
    return await QRCode.toDataURL(text, opts)
  } catch (err) {
    console.error(err)
  }
}



function idealFontSize (font, text, maxWidth, minSize, defaultSize) {

  let currentSize = defaultSize
  let textWidth = font.widthOfTextAtSize(text, defaultSize)

  while (textWidth > maxWidth && currentSize > minSize) {
    textWidth = font.widthOfTextAtSize(text, --currentSize)
  }

  return (textWidth > maxWidth) ? null : currentSize
}

async function generatePdf (profile, reasons, dateactuel, dateactuelhours, datesortie, datesortieheures) {
  const creationDate = dateactuel
  const creationHour = dateactuelhours

  const data = [
    `Cree le: ${creationDate} a ${creationHour}`,
    `Nom: ${profile.nom}`,
    `Prenom: ${profile.prenom}`,
    `Naissance: ${profile.dt_naissance} a ${profile.lieu_naissance}`,
    `Adresse: ${profile.addresse} ${profile.cd_postal} ${profile.ville}`,
    `Sortie: ${datesortie} a ${datesortieheures}`,
    `Motifs: ${reasons}`,
  ].join('; ')

  const existingPdfBytes = await fetch(pdfBase).then(res => res.arrayBuffer())

  const pdfDoc = await PDFDocument.load(existingPdfBytes)
  const page1 = pdfDoc.getPages()[0]

  const font = await pdfDoc.embedFont(StandardFonts.Helvetica)
  const drawText = (text, x, y, size = 11) => {
    page1.drawText(text, { x, y, size, font })
  }

  drawText(`${profile.prenom} ${profile.nom}`, 123, 686)
  drawText(profile.dt_naissance, 123, 661)
  drawText(profile.lieu_naissance, 92, 638)
  drawText(`${profile.addresse} ${profile.cd_postal} ${profile.ville}`, 134, 613)

  if (reasons.includes('professionels')) {
    drawText('x', 76, 527, 19)
  }
  if (reasons.includes('Achats')) {
    drawText('x', 76, 478, 19)
  }
  if (reasons.includes('Consultations')) {
    drawText('x', 76, 436, 19)
  }
  if (reasons.includes('familial')||reasons.includes('Assistance')||reasons.includes('Garde')) {
    drawText('x', 76, 400, 19)
  }
  if (reasons.includes('physique')) {
    drawText('x', 76, 345, 19)
  }
  if (reasons.includes('judiciaire')) {
    drawText('x', 76, 298, 19)
  }
  if (reasons.includes('demande')) {
    drawText('x', 76, 260, 19)
  }
  let locationSize = idealFontSize(font, profile.ville, 83, 7, 11)


  drawText(profile.ville  , 111, 226, locationSize)

  if (reasons !== '') {
    // Date sortie
    drawText(`${datesortie}`, 92, 200)
    drawText(`${datesortieheures}`, 200, 201)
  }

  // Date création
  drawText('Date de création:', 464, 150, 7)
  drawText(`${dateactuel} à ${dateactuelhours}`, 455, 144, 7)

  const generatedQR = await generateQR(data)

  const qrImage = await pdfDoc.embedPng(generatedQR)

  page1.drawImage(qrImage, {
    x: page1.getWidth() - 170,
    y: 155,
    width: 100,
    height: 100,
  })

  pdfDoc.addPage()
  const page2 = pdfDoc.getPages()[1]
  page2.drawImage(qrImage, {
    x: 50,
    y: page2.getHeight() - 350,
    width: 300,
    height: 300,
  })

  const pdfBytes = await pdfDoc.save()

  

  //return new Blob([pdfBytes], { type: 'application/pdf' })
  return 3
}





export default generatePdf

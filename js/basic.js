/* global jsPDF */
/* global jsPDF */
async function getFont() {
  console.log('⏰ Fetching the font...');
  const response = await fetch(
    'https://db.onlinewebfonts.com/t/3a025ae92e6446cec24efcb6d29e5bf3.ttf'
  );
  const fontBlob = await response.blob();
  console.log('Successfully get the blob!! ✅');
  return fontBlob;
}

var blobToBase64 = function(blob, callback) {
  var reader = new FileReader();
  reader.onload = function() {
    var dataUrl = reader.result;
    var base64 = dataUrl.split(',')[1];
    console.log('Blob64 Ready!! 😃');
    callback(base64);
  };
  reader.readAsDataURL(blob);
};

async function demoUsingTTFFont(contentWrapper) {
  const textElement = document.getElementById(contentWrapper);
  getFont()
    .then(response => {
      blobToBase64(response, function(base64) {
        const doc = new jsPDF({ filters: ['ASCIIHexEncode'] });
        doc.addFileToVFS('malgun.ttf', base64);
        doc.addFont('malgun.ttf', 'malgun', 'normal');
        doc.setFont('malgun'); // set font
        doc.setFontSize(10);
        doc.text(textElement.innerText, 10, 10);
        doc.save('test.pdf');
        console.log('Downloading PDF!! 👍');
      });
    })
    .catch(error => {
      console.log('Error in fetching the font data 😥', error);
    });
}

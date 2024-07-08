export const getCroppedImg = (imageSrc, crop) => {
  const canvas = document.createElement("canvas");
  const image = new Image();
  image.src = imageSrc;

  return new Promise((resolve) => {
    image.onload = () => {
      const scaleX = image.width / image.naturalWidth;
      const scaleY = image.height / image.naturalHeight;
      canvas.width = crop.width;
      canvas.height = crop.height;
      const ctx = canvas.getContext("2d");

      ctx.drawImage(
        image,
        crop.x * scaleX,
        crop.y * scaleY,
        crop.width * scaleX,
        crop.height * scaleY,
        0,
        0,
        crop.width,
        crop.height
      );

      canvas.toBlob((blob) => {
        resolve(URL.createObjectURL(blob));
      }, "image/jpeg");
    };
  });
};

export const createFileFromBlobUrl = async (blobUrl, fileName, mimeType) => {
  const response = await fetch(blobUrl);
  const blob = await response.blob();
  const file = new File([blob], fileName, { type: mimeType });
  return file;
};


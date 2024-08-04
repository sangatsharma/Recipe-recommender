import * as nsfwjs from "nsfwjs";

export const loadImage = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (event) => {
      const img = new Image();
      img.src = event.target.result;
      img.onload = () => resolve(img);
      img.onerror = (error) => reject(error);
    };
    reader.readAsDataURL(file);
  });
};



export const loadModel = async (image) => {

    try {
      const model = await nsfwjs.load("/models/mobilenet_v2/");
      const predictions = await model.classify(image);
      console.log(predictions);
      const drawingNeutralSum = predictions.reduce((sum, prediction) => {
        if (
          prediction.className === "Drawing" ||
          prediction.className === "Neutral"
        ) {
          return sum + prediction.probability;
        }
        return sum;
      }, 0);
      const hentaiPornSexySum = predictions.reduce((sum, prediction) => {
        if (
          prediction.className === "Hentai" ||
          prediction.className === "Porn" ||
          prediction.className === "Sexy"
        ) {
          return sum + prediction.probability;
        }
        return sum;
      }, 0);

      if (drawingNeutralSum < hentaiPornSexySum) return true;
      else return false;
    } catch (error) {
      console.error("Error loading NSFWJS model:", error);
    }
  };
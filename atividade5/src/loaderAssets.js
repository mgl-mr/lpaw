const loadImage = async (url) =>
  new Promise(resolve => {
    const img = new Image();

    img.addEventListener("load", () => {
      return resolve(img);
    });

    img.src = url;
  });

  const loadAudio = async(path)=>new Promise(resolve=>{
    const audio = new Audio(path);
    return audio.addEventListener("canplaythrough",()=>{
        return resolve(audio);
    });
});

export { loadImage, loadAudio }
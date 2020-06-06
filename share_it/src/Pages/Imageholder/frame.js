import React from "react";
import "./styles/frame.scss";



const Imageframe = ({ id,profile }) => {
  const inputRef = React.useRef();

  const [noImage, setImage] = React.useState(true);
  const [url, seturl] = React.useState(null);
  const [pickedFile,setFile]=React.useState(null);
  const pickImageHandler = () => {
    inputRef.current.click();
  };
  const fileChangeHandler = (event) => {
    const file_holder=event.target.files
    if (file_holder && file_holder.length === 1){
         setFile((prev)=>file_holder[0])
         profile((prev)=>file_holder[0])
    }
      setImage((prev) => false);
  };
  const closHandler = () => {
    // inputRef.current.value = null;
    setFile((prev)=>null)
    setImage((prev) => true);
  };
  React.useEffect(()=>{
     if(!pickedFile){
       return;
     }
     const fileReader=new FileReader();
     fileReader.onload=()=>{
      seturl(fileReader.result)
    }
     fileReader.readAsDataURL(pickedFile);
    
  },[pickedFile])
  return (
    <section className="fileContainer">
      <input
        id={id}
        ref={inputRef}
        type="file"
        accept=".jpg,.png.jpeg"
        style={{ display: "none" }}
        onChange={fileChangeHandler}
      />
      <div class="image_uploader">
        <div className="image_button" onClick={pickImageHandler}>
          <h7>Pick Image</h7>
        </div>
        <div className="upload_holder">
          {noImage ? <h7>No Image</h7> : <img src={url} alt="preview" />}
        </div>
      </div>
    </section>
  );
};

export default Imageframe;

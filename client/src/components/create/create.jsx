import React, { useState , useEffect} from "react";
import { useNavigate } from "react-router-dom";
import { AiOutlineCloseCircle } from "react-icons/ai";
import classes from './create.module.css';

const Create = () => {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [price, setPrice] = useState(0);
  const [region, setRegion] = useState("");
  const [photo, setPhoto] = useState("");  
  const [rating, setRating] = useState(0);
  const [notAvailableDate, setNotAvailableDate] = useState([]);
  const [showSuccess, setShowSuccess] = useState(false);
  const navigate = useNavigate();  
  const onChangeFileFirst = (e) => {
    setPhoto(e.target.files[0]);
  };
  useEffect(() => {
    const token = localStorage.getItem('token');
    console.log("Token when Create component mounts:", token);
 }, []);
  const handleCreateProduct = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();

      let filename = null;
      if (photo) {   
        filename = Date.now() + photo.name;
        formData.append("filename", filename);
        formData.append("image", photo);
        const token = localStorage.getItem('token');
        const uploadRes=await fetch(`http://localhost:5000/upload/image`, {
          method: "POST",  
          headers: {
            "Authorization": `Bearer ${token}`
          },       
          body: formData,
        });
       
      
        if (!uploadRes.ok) {
          console.error("Image upload failed.");
          return;
        }
        const payload = {
          title,
          desc,
          price,
          region,
          photo: filename, 
          rating,
          NotAvailableDate: notAvailableDate  
        };
        const res = await fetch("http://localhost:5000/place", {
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
          },
          method: "POST",
          body: JSON.stringify(payload),
        });
        if (res.ok) {  
          setShowSuccess(true);
          setTimeout(() => setShowSuccess(false), 3000);  
      }
        else if (res.status === 401) {
          alert("Token is expired. Please login again.");
        }
        else {console.log(await res.text());}   
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleCloseImg = () => {
    setPhoto(prev => null) 
  }

  return (
    <div className={classes.container}>
      <div className={classes.wrapper}>
        <h2 className={classes.title}>Create Package</h2>
        <form onSubmit={handleCreateProduct} encType="multipart/form-data">
          <div className={classes.inputWrapper}>
            <label >Title: </label>
            <input
              name="title"
              onChange={(e) => setTitle(e.target.value)}
              className={classes.input}
              type="text"
              placeholder="title..."
            />
          </div>
          <div className={classes.inputWrapper}>
            <label >Description: </label>
            <input
              name="desc"
              onChange={(e) => setDesc(e.target.value)}
              className={classes.input}
              type="text"
              placeholder="description..."
            />
          </div>
          <div className={classes.inputWrapper}>
            <label >Region: </label>
            <input
              name="region"
              onChange={(e) => setRegion(e.target.value)}
              className={classes.input}
              type="text"
              placeholder="Region....."
            />
          </div>
          <div className={classes.inputWrapperImgFirst}>
            <label className={classes.labelFileInput} htmlFor="firstImg" >
              First image: <span>Upload here</span>
            </label>
            <input
              className={classes.input}
              type="file"
              filename="firstImg"
              id="firstImg"
              onChange={onChangeFileFirst}
              placeholder="image..."
              style={{ display: "none" }}
            />
            {photo && <p className={classes.imageName}>{photo.name} <AiOutlineCloseCircle onClick={handleCloseImg} className={classes.closeIcon}/></p>}
          </div>
          <div className={classes.inputWrapper}>
            <label >Price: </label>
            <input
              step={0.01}
              name="price"
              onChange={(e) => setPrice(e.target.value)}
              className={classes.input}
              type="number"
              placeholder="price..."
            />
          </div>
          <div className={classes.inputWrapper}>
            <label >Stars: </label>
            <input
              min={1}
              max={5}
              step={1}
              name="stars"
              onChange={(e) => setRating(e.target.value)}
              className={classes.input}
              type="number"
              placeholder="stars..."
            />
          </div>
          <div className={classes.buttonWrapper}>
            <button className={classes.submitBtn} type="submit">
              Create Product
            </button>
          </div>
          {showSuccess && (
                    <div className={classes.successMessage}>
                        Data saved successfully!
                    </div>
                )} 
        </form>            
      </div>
    </div>
  )
}

export default Create
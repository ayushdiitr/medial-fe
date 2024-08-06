import axios from "axios";
import { useState } from "react";
import "./index.css";

const PostPage = () => {

    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');
    const [image, setImage] = useState(null);
    const [imageUrl, setImageUrl] = useState('');
    const [loading, setLoading] = useState(false);

    const handleImage = (e) => {
        const file = e.target.files[0];
        setImage(URL.createObjectURL(file));
    }

    const handleSubmit = async (e) => {

        e.preventDefault();

        if (!title || !body) {
            alert('Please fill all the fields');
            return;
        }

        setLoading(true);

        try {
            const data = { title, body, image };
            const response = await axios.post(`http://localhost:4000/api/image`, data)
            const imgUrl = `data:image/png;base64,${response.data.image}`;
            console.log(response.data);
            // const imgUrl = URL.createObjectURL(new Blob([response.data.image]));
            setImageUrl(imgUrl);
            setLoading(false);
        } catch (err) {
            console.log(err);
            setLoading(false);
        }
    }


    return (
        <div>
            <h1 className="heading">Create Post</h1>
            <form className="form-container" onSubmit={handleSubmit}>
                <div className="form-child">
                    <label>Title</label>
                    <input type="text" name="title" value={title} onChange={e => setTitle(e.target.value)} />
                </div>

                <div className="form-child">
                    <label>Body</label>
                    <input name="body" value={body} onChange={e => setBody(e.target.value)} />
                </div>

                {/* <div className="form-child">
                    <label>Image</label>
                    <input type="file" name="image" onChange={handleImage} />
                </div> */}
                {
                    loading ? <p>Loading...</p> :
                        <button className="submit-btn" type="submit">Submit</button>
                }
            </form>
            <div className="img-container">
                {imageUrl && <img src={imageUrl} alt="Selected" style={{ width: '1200px', height: '630px' }} />}
            </div>
        </div>
    )
}

export default PostPage;
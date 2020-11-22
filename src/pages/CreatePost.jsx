import { useState } from "react";
import { Container, Grid, TextField } from "@material-ui/core";

import { Casourel } from "../components";

function CreatePost() {
  const [images, setImages] = useState([]);

  const handleImagesChange = (event) =>
    setImages(
      Array.from(event.target.files).map((image) => ({
        src: URL.createObjectURL(image),
      }))
    );

  return (
    <Container>
      <Casourel images={images} />
      <label htmlFor="images">adsd</label>
      <input
        multiple
        type="file"
        onChange={handleImagesChange}
        id="images"
        name="images"
      />
    </Container>
  );
}

export default CreatePost;

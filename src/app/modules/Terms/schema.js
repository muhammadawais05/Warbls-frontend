import * as Yup from "yup"
import valid from 'card-validator';
export const schema = Yup.object().shape({
    bpm: Yup.string().required("bpm is required"),
    genre: Yup.string().required("genre is required"),
    key: Yup.string().required("key is required"),
    language: Yup.string().required("language is required"),
    track_name: Yup.string().required("track name is required"),
    //track_url: Yup.string().required("track file is required"),
    //image_url: Yup.string().required("image file is required"),
})
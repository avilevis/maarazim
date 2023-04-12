import styles from './image-container.module.scss'
import React, {ReactEventHandler, useState} from "react";
import Form from 'react-bootstrap/Form';
import {CiImageOn} from 'react-icons/ci';

interface ImageContainerProps {
    loadImageBtn: string
    required: boolean
    updateImage: (image: any) => void
}

function ImageContainer(props: ImageContainerProps) {
    const [createObjectURL, setCreateObjectURL] = useState<string | null>(null);

    const uploadToClient = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files[0]) {
            const newImage: object = event.target.files[0];

            props.updateImage(newImage);
            setCreateObjectURL(URL.createObjectURL(newImage));
        }
    };

    return (
        <div className={styles.input_image_container}>
            <div className={styles.image_container}>
                {createObjectURL ? <img alt={'upload image'} src={createObjectURL}/> :
                    <CiImageOn className={styles.image_icon}/>}
            </div>
            <Form.Group controlId="image" className={["mb-3", styles.input_container].join(" ")}>
                <Form.Label>{props.loadImageBtn}</Form.Label>
                <Form.Control type="file" required={props.required} size="sm" onChange={uploadToClient}/>
            </Form.Group>
        </div>
    )
}

export default ImageContainer;
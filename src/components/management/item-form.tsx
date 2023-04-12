import React, {useState} from 'react';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Spinner from 'react-bootstrap/Spinner';
import {useAppContext} from "@/context/context";
import {ItemInterface} from "@/intefaces/item.inteface";
import ImageContainer from './image-container'
import {imageUpload} from "@/utils/request";

interface ItemFormProps {
    className: string
    item?: ItemInterface
    submit: (item: unknown) => Promise<object>
}

function ItemForm(props: ItemFormProps) {
    const ctx = useAppContext()
    const [validated, setValidated] = useState(false);
    const [image, setImage] = useState(null)
    const [sending, setSending] = useState(false)
    const getValues = (form) => {
        const getValue = (el) => el.type === "checkbox" ? el.checked : el.value;

        return Array.from(form).reduce((acc, el) => (el.id ? {...acc, [el.id]: getValue(el)} : acc), {})
    }
    const updateImage = (image) => {
        setImage(image)
    }
    const handleSubmit = async (event) => {
        const form = event.currentTarget;

        event.preventDefault();
        event.stopPropagation();
        if (form.checkValidity() === false) {
            console.error("form validation error")
            return
        }
        setValidated(true);

        let newItemFields = getValues(form)

        if (newItemFields?.image) {
            const {filePath} = await imageUpload(image)
            newItemFields = {...newItemFields, image: filePath}
        }

        setSending(true);
        props.submit(newItemFields)
            .catch((e) => {
                window.alert(e);
            })
            .finally(() => {
                setSending(false);
            })
    };

    return (
        <Form className={props.className} noValidate validated={validated} onSubmit={handleSubmit}>
            <Row>
                <Form.Group as={Col} xs={1} className="mb-3" controlId="enable">
                    <Form.Label>{ctx.translates?.enable}</Form.Label>
                    <Form.Switch defaultChecked={props.item?.enable ?? false}/>
                </Form.Group>

                <Form.Group as={Col} xs={2} className="mb-3" controlId="id">
                    <Form.Label>{ctx.translates?.id}</Form.Label>
                    <Form.Control required={!props.item} type="text" defaultValue={props.item?.id ?? ''} size="sm"
                                  disabled={!!props.item}/>
                </Form.Group>

                <Form.Group as={Col} className="mb-3" controlId="title">
                    <Form.Label>{ctx.translates?.title}</Form.Label>
                    <Form.Control type="text" required={!props.item} minLength="3"
                                  defaultValue={props.item?.title ?? ''} size="sm"/>
                </Form.Group>

                <Form.Group as={Col} className="mb-3" controlId="sub_title">
                    <Form.Label>{ctx.translates?.sub_title}</Form.Label>
                    <Form.Control type="text" required={!props.item} minLength="3"
                                  defaultValue={props.item?.sub_title ?? ''}
                                  size="sm"/>
                </Form.Group>
            </Row>

            <ImageContainer loadImageBtn={ctx.translates?.load_image_btn} required={!props.item}
                            updateImage={updateImage}/>

            <Form.Group className="mb-3" controlId="info">
                <Form.Label>{ctx.translates?.info}</Form.Label>
                <Form.Control as="textarea" required={!props.item} rows={3} defaultValue={props.item?.info ?? ''}
                              size="sm"/>
            </Form.Group>

            {!sending && <Button variant="primary" type="submit">
                {ctx.translates?.save_btn}
            </Button>}
            {sending && <Spinner animation="grow" variant="primary"/>}
        </Form>
    );
}

export default ItemForm;
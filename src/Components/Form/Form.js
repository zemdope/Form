import classes from "./Form.module.css";
import {useForm} from 'react-hook-form';
import React, {useState, useEffect} from 'react';
import axios from 'axios';
import {Form, Button, Card} from 'react-bootstrap';



const FormTask = () => {

    const [charLeft, setCharLeft] = useState(255)
    const [valueBrutto, setValueBrutto] = useState(0.0)
    const [error, setError] = useState(false)
    const [succes, setSucces] = useState(false)

    const { register, setValue, handleSubmit, watch, formState: { errors } } = useForm();
    const watchFields = watch(["priceNetto", "vat"])


    const postForm = async (data) => {
        axios
        .post(
            'http:/localhost:3000/api/form',
            data,
            { headers: { 'Content-Type': 'application/json' }}
         )
        .then(res => {
            setSucces(true);
            console.log(res.data)
        }
            )
        .catch(e => {
            setError(true)
            console.log(e)
        });
    }


    const onSubmit = (data) =>{
        console.log(data.priceBrutto)
        postForm(data)
    }



     useEffect(() => {
         setValueBrutto(watchFields[0]*watchFields[1])
         setValue("priceBrutto", valueBrutto.toFixed(2))
     }, [watch, watchFields, setValue, valueBrutto])

    if(!succes){
    return(
            <Form className={classes.form} style={{marginTop:"30px"}} onSubmit={handleSubmit(onSubmit)}>
            <div>
                <Form.Label htmlFor="description">Description</Form.Label>
                    <Form.Control size="lg" as="textarea" maxLength="255" onChangeCapture={(e) => setCharLeft(255-e.target.value.length)} {...register("description", {required: true, max: 255, maxlength: "255"})} >
                    </Form.Control >
                    <h6>Characters left:{charLeft}</h6>
                    {errors.description && <p>Text is required </p>}
            </div>
            <div>
                <Form.Label htmlFor="sendConfirmation">Send Confirmation</Form.Label>
                    <Form.Check  label="Yes" name="Sendconfirmation"  type="radio"
                    {...register("Sendconfirmation", { required: true })}  value="YES" />
                    <Form.Check   label="No" name="Sendconfirmation"  type="radio"
                    {...register("Sendconfirmation", { required: true })}   value="NO" />
                    {errors.Sendconfirmation && <p>Text is required</p>}
            </div>
            <div>
            <Form.Label htmlFor="Vat">VAT</Form.Label>
                <Form.Control  as="select" size="lg"  {...register('vat', { required: "select one option"})}>
                    <option value="" >Choose Vat</option>
                    <option value="1.19">19%</option>
                    <option value="1.21">21%</option>
                    <option value="1.23">23%</option>
                    <option value="1.25">25%</option>
                </Form.Control>
                {errors.vat &&  <p>Text is required</p> }
            </div>
            <div>
                <Form.Label htmlFor="priceNetto">Price netto EUR</Form.Label>
                    <Form.Control type="number"  step="0.01" placeholder="priceNetto" {...register("priceNetto", 
                    {required: true })} />
                {errors.priceNetto && <p>Please, input number</p>}

            </div>
            <div>
                <Form.Label htmlFor="priceBrutto">Price brutto EUR</Form.Label>
                    <Form.Control type="number" step="0.01" disabled  placeholder="priceBrutto"
                    {...register("priceBrutto")} />
            </div>
            <div>
            <Button variant="success" type="submit" style={{marginTop:"5px"}} > Wyślij</Button>
            {error && <p>Something went wrong</p>}
            </div>
            
        </Form>

    )
    }
    else{
        return(
            <Card border="success" className={classes.form} style={{marginTop:"30px"}}>
                <Card.Body style={{color:"green"}}>Congratulation, form was sent properly</Card.Body>
            </Card>
        )
    }

}

export default FormTask;
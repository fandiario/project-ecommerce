import Axios from 'axios'
import swal from 'sweetalert'
import linkAPICarts from "../../Constants/linkAPICarts"

export const getDataCart = (userId, productId, quantity) => {

    return (dispatch) => {
        Axios.get (linkAPICarts + `?idProduct=${productId}`) 

        .then ((res) => {

            if (res.data.length === 0) {

                Axios.post (linkAPICarts, {idUser: userId, idProduct: productId, quantity: quantity})

                .then ((res) => {
                    // console.log (res)
                    swal({
                        title: "Successfully added to your cart",
                        icon: "success",
                        className:"furniture-border-primary"
                    });
                    // let url = this.props.location.pathname
                    
                    // window.location = `/detail-product/${productId}`

                    Axios.get (linkAPICarts +`?idUser=${userId}`)

                    .then ((res) => {
                        dispatch ({
                            type: "GET_DATA_SUCCESS",
                            payload: res.data
                        })

                        window.location = `/products`
                    })

                    .catch ((err) => {
                        console.log (err)
                    })
                })

                .catch ((err) => {
                    console.log (err)
                })

            } else {

                // If there's the same product
                let cartId = res.data[0].id
                let quantityCart = res.data[0].quantity
                let addQuantity = quantityCart + 1

                Axios.patch (linkAPICarts + `/${cartId}`, {quantity: addQuantity})

                .then ((res) => {
                    // console.log (res)
                    // console.log (`Quantity has been added. Quantity now: ${res.data.quantity}`)
                    swal({
                        title: "Successfully added to your cart",
                        icon: "success",
                        className:"furniture-border-primary"
                    })
                    // window.location = `/detail-product/${productId}`

                    Axios.get (linkAPICarts + `?idUser=${userId}`)

                    .then ((res) => {
                        dispatch ({
                            type: "GET_DATA_SUCCESS",
                            payload: res.data
                        })
                        window.location = `/products`
                    })

                    .catch ((err) => {
                        console.log (err)
                    })
                })

                .catch ((err) => {
                    console.log (err)
                })

            }

        })

        .catch ((err) => {
            console.log (err)
        })
    }
}
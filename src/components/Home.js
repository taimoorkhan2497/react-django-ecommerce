import React, { useState , useEffect} from 'react'
import {connect} from 'react-redux';
import axios from 'axios';
import {productListURL} from '../constants';
import { Container, Message, Segment , Item, Dimmer, Loader, Image, Button, Icon, Label} from 'semantic-ui-react';
import {authAxios} from '../utils';
import {addToCartURL} from '../constants';
import { fetchCart } from '../store/actions/cart';
import { Link } from 'react-router-dom';
import MainPage from './MainPage'


function Home(props) {
    const {refreshCart} = props;
    const [products, setProducts] = useState([]);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        refreshCart();
        axios.get(productListURL).then(res => {
            setProducts(res.data);
            setLoading(false);
        }).catch(error =>{
            setError(error);
            setLoading(false);
        });
        
    }, []);

    const handleAddtoCart = (slug) =>{
        authAxios.post(addToCartURL, {
            'slug' : slug
        }).then(res =>{
            props.refreshCart();
            setLoading(false);
            setError('');
        }).catch(error =>{
            setLoading(false);
            setError(error);
        })
    }
    
    return (
        <div>
        <MainPage/>
     
      </div>
    )
    
}

const mapStateToProps = (state) => {
    return {
        loading : state.auth.loading,
        error : state.auth.error,
        cart : state.cart.cart
    }
   
}

const mapDispatchToProps = (dispatch)=>{
    return {
        refreshCart : () => dispatch(fetchCart())
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(Home)

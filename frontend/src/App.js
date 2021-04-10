import React, { Component } from "react";
import ProductTable from './ProductTable';
import AddTitle from './AddTitle';
import axios from 'axios';
import { AvForm, AvField } from 'availity-reactstrap-validation';
import { Button, Modal, ModalBody, ModalHeader, ModalFooter, Label } from 'reactstrap';

class App extends Component {
  //initial state details
  state = {
    products: [],
    error: '',
    newProductData: {
      title: '',
      description: '',
      price: ''
    },
    editProductData: {
      id: '',
      title: '',
      description: '',
      price: ''
    },
    newProductModal: false,
    editProductModal: false
  }

  componentDidMount() {
    this._refreshProducts();
  }

  componentDidUpdate(prevState) {
    if (prevState.title !== this.state.title || prevState.description !== this.state.description || prevState.price !== this.state.price) {
      this._refreshProducts();
    }
  }

  toggleNewProductModal() {
    this.setState({
      newProductModal: !this.state.newProductModal,
      newProductData: {},
      error: ''
    });
  }

  toggleEditProductModal() {
    this.setState({
      editProductModal: !this.state.editProductModal,
      error: ''
    });
  }

  //To add a new Product through axios post method
  addProduct() {
    axios.post('http://localhost:3001/products/', this.state.newProductData).then((response) => {
      let { products } = this.state;
      products.push(this.state.newProductData);
      this.setState({
        products, newProductModal: false, newProductData: {
          title: '',
          description: '',
          price: ''
        }
      }, this._refreshProducts());
    })
      .catch(err => {
        this.setState({ error: err.response.data });
      })
  }

  //Update the Product 
  updateProduct() {
    let { title, description, price } = this.state.editProductData;
    axios.patch(`http://localhost:3001/products/${this.state.editProductData.id}`, { title, description, price }).then((response) => {
      this._refreshProducts();
      this.setState({
        editProductModal: false, editProductData: { title: '', description: '', price: '' }
      })
    })
      .catch(err => {
        this.setState({ error: err.response.data });
      })
  }

  editProduct(id, title, description, price) {
    this.setState({
      editProductData: { id, title, description, price }, editProductModal: !this.state.editProductModal
    })
  }

  //delete Product
  deleteProduct(id) {
    axios.delete(`http://localhost:3001/products/${id}`).then((response) => {
      this._refreshProducts();
    })
  }
  //refresh the list of the products after the operations
  _refreshProducts() {
    axios.get('http://localhost:3001/products/').then((response) => {
      this.setState({
        products: response.data
      })
    });
  }

  render() {
    // to map products and render them inside the table
    let products = this.state.products.map((product) => {
      return (
        <tr key={product.id}>
          <td>{product.title}</td>
          <td>{product.description}</td>
          <td>{product.price}</td>
          <td>
            <Button color="success" size="sm" className="edit-button" classtitle="mr-2 mb-1" onClick={this.editProduct.bind(this, product.id, product.title, product.description, product.price)}>Edit</Button>
            <Button color="danger" size="sm" onClick={this.deleteProduct.bind(this, product.id)}>Delete</Button>
          </td>
        </tr>
      )
    })
    return (
      <div classtitle="App container">
        <div className="jumbotron">
          <h1>My products</h1>
          <Button classtitle="my-3" color="primary" onClick={this.toggleNewProductModal.bind(this)}>Add a new Product</Button>

          <Modal isOpen={this.state.newProductModal} toggle={this.toggleNewProductModal.bind(this)}>
            <ModalHeader toggle={this.toggleNewProductModal.bind(this)}>{this.state.error ? <span classtitle="alert alert-danger p-1" role="alert">{this.state.error}</span> : "Add a new Product"}</ModalHeader>
            <ModalBody>
              <AddTitle value={this.state.newProductData.title} onChange={(e) => {
                let { newProductData } = this.state;
                newProductData.title = e.target.value;
                this.setState({ newProductData, error: '' });
              }} />
              <AvForm>
                <Label for="description">Description</Label>
                <AvField id="description" name="description" value={this.state.newProductData.description} required onChange={(e) => {
                  let { newProductData } = this.state;
                  newProductData.description = e.target.value;
                  this.setState({ newProductData, error: '' });
                }} />
              </AvForm>
              <AvForm>
                <Label for="price">Price</Label>
                <AvField id="price" name="price" value={this.state.newProductData.price} required onChange={(e) => {
                  let { newProductData } = this.state;
                  newProductData.price = isNaN(Number(e.target.value)) === false ? e.target.value : '';
                  this.setState({ newProductData, error: '' });
                }} />
              </AvForm>
            </ModalBody>
            <ModalFooter>
              <Button color="primary" disabled={!this.state.newProductData.description || !this.state.newProductData.title || !this.state.newProductData.price} onClick={this.addProduct.bind(this)}>Add Product</Button>{' '}
              <Button color="secondary" onClick={this.toggleNewProductModal.bind(this)}>Cancel</Button>
            </ModalFooter>
          </Modal>

          <Modal isOpen={this.state.editProductModal} toggle={this.toggleEditProductModal.bind(this)}>
            <ModalHeader toggle={this.toggleEditProductModal.bind(this)}>{this.state.error ? <span classtitle="alert alert-danger p-1" role="alert">{this.state.error}</span> : "Edit the Product"}</ModalHeader>
            <ModalBody>
              <AvForm>
                <Label for="title">Title</Label>
                <AvField id="title" name="title" value={this.state.editProductData.title} required onChange={(e) => {
                  let { editProductData } = this.state;
                  editProductData.title = e.target.value;
                  this.setState({ editProductData, error: '' });
                }} />
              </AvForm>
              <AvForm>
                <Label for="description">Description</Label>
                <AvField id="description" name="description" value={this.state.editProductData.description} required onChange={(e) => {
                  let { editProductData } = this.state;
                  editProductData.description = e.target.value;
                  this.setState({ editProductData, error: '' });
                }} />
              </AvForm>
              <AvForm>
                <Label for="price">Price</Label>
                <AvField id="price" name="price" value={this.state.editProductData.price} required onChange={(e) => {
                  let { editProductData } = this.state;
                  editProductData.price = isNaN(Number(e.target.value)) === false ? e.target.value : '';
                  this.setState({ editProductData, error: '' });
                }} />
              </AvForm>
            </ModalBody>
            <ModalFooter>
              <Button color="primary" onClick={this.updateProduct.bind(this)}>Edit a Product</Button>{' '}
              <Button color="secondary" onClick={this.toggleEditProductModal.bind(this)}>Cancel</Button>
            </ModalFooter>
          </Modal>
          <ProductTable products={products} />
        </div>
      </div>
    );
  }
}

export default App;
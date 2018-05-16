import React, { Component } from "react";
import { Progress, Alert, Container, Form, FormGroup, Button, Input, Label } from "reactstrap";
import { Redirect, Link } from "react-router-dom";
import { httpPost } from '../xmlhttp.js';
import Sesion from "./sesion.js";
import Plantilla from "./plantilla.js";

function actualizarEntrada(objeto) {
    return propiedad => e => {
        const estado = {};
        estado[propiedad] = e.target.value;
        objeto.setState(estado);
    };
}

class Registro extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: '',
            clave: '',
            mostrarAlerta: false
        };
        this.actualizarEntrada = actualizarEntrada(this);
    }

    render() {
        return(
            <Plantilla>
              <Container
                className="border"
                style={{padding: "30px", width: "400px"}}>
                <Form onSubmit={e => this.registrar(e)}>
                  <h1> Registro </h1>
                  <FormGroup>
                    <Label>Contraseña</Label>
                    <Input type="password" placeholder="Contraseña"
                           value={this.state.clave}
                           onChange={this.actualizarEntrada("clave")}/>
                    <small className="form-text text-muted">
                      El usuario será asignado automáticamente.
                    </small>
                  </FormGroup>
                  <Button className="float-right" color="primary">SIGUIENTE</Button>
                </Form>
                <Link to="/inicio-sesion">
                  <Button className="float-left" color="link">
                    Iniciar sesión
                  </Button>
                </Link>
                <br/><br/>
                {
                    this.state.mostrarAlerta
                        ? (
                            <Alert color="danger">
                              No se pudo crear el usuario.
                            </Alert>
                        )
                        : null
                }
            </Container>
                </Plantilla>
        );
    }

    registrar(e) {
        e.preventDefault();
        httpPost("http://localhost:3001/usuario", {"clave": this.state.clave})
            .then(JSON.parse)
            .then(json => {
                return Sesion.iniciar(json.id, this.state.clave);
            })
            .then(json => {
                this.props.history.push('/');
            })
            .catch(error => {
                console.log(error);
                this.setState({
                    "mostrarAlerta": true
                });
            });
    }
}

export default Registro;

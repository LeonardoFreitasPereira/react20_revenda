import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import './table.css';

const App = () => {
  const { register, handleSubmit, errors, setValue } = useForm();
  const [lista, setLista] = useState([]);

  const onSubmit = (data, e) => {
    const carros = localStorage.getItem("carros")
      ? JSON.parse(localStorage.getItem("carros"))
      : "";

    localStorage.setItem("carros", JSON.stringify([...carros, data]));

    // atualiza a lista
    setLista([...lista, data]);

    // pode-se "limpar" cada campo usando setValue
    setValue("modelo", "");

    // ou "limpar" todo o form com reset
    e.target.reset();
  };

  // obtém o ano atual
  const ano_atual = new Date().getFullYear();

  // occore após o componente ser renderizado
  useEffect(() => {
    setLista(
      localStorage.getItem("carros")
        ? JSON.parse(localStorage.getItem("carros"))
        : []
    );
  }, []);

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-sm-12 bg-primary py-2">
          <h1 className="text-white">
            Revenda Herbie - Veículos Novos e Usados
          </h1>
          <h4 className="text-white font-italic">
            Sistema de Cadastro e Manutenção de Veículos Disponíveis para Venda
          </h4>
        </div>
      </div>

      <div className="row">
        <div className="col-sm-3">
          <img
            src="herbie.jpg"
            alt="Revenda Herbie"
            className="img-fluid mx-auto d-block"
          />
        </div>

        <div className="col-sm-9 mt-2">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="input-group mb-3">
              <div className="input-group-prepend">
                <span className="input-group-text">Modelo:</span>
              </div>
              <input
                type="text"
                className="form-control"
                name="modelo"
                autoFocus
                ref={register({ required: true, minLength: 2, maxLength: 30 })}
              />
              <div className="input-group-prepend">
                <span className="input-group-text">Marca:</span>
              </div>
              <select
                className="form-control"
                name="marca"
                ref={register({ required: true })}
              >
                <option value="">-- Selecione a Marca --</option>
                <option value="Chevrolet">Chevrolet</option>
                <option value="Fiat">Fiat</option>
                <option value="Ford">Ford</option>
                <option value="Renault">Renault</option>
                <option value="Volkswagen">Volkswagen</option>
              </select>
            </div>
            <div className="input-group mb-3">
              <div className="input-group-prepend">
                <span className="input-group-text">Ano:</span>
              </div>
              <input
                type="number"
                className="form-control"
                name="ano"
                ref={register({
                  required: true,
                  min: ano_atual - 30,
                  max: ano_atual + 1,
                })}
              />
              <div className="input-group-prepend">
                <span className="input-group-text">Preço R$:</span>
              </div>
              <input
                type="number"
                className="form-control"
                name="preco"
                ref={register({ required: true, min: 5000, max: 100000 })}
              />
              <div className="input-group-append">
                <input
                  type="submit"
                  className="btn btn-primary"
                  value="Adicionar"
                />
              </div>
            </div>
          </form>
          <div
            className={
              (errors.modelo || errors.marca || errors.ano || errors.preco) &&
              "alert alert-danger"
            }
          >
            {errors.modelo && (
              <span>Modelo deve ser preenchido (até 30 caracteres); </span>
            )}
            {errors.marca && <span>Marca deve ser selecionada; </span>}
            {errors.ano && (
              <span>
                Ano deve ser preenchido (entre {ano_atual - 30} e {ano_atual + 1}
                );
              </span>
            )}
            {errors.preco && (
              <span>Preço deve ser preenchido (entre 5000 e 100000); </span>
            )}
          </div>

          <table className="table table-striped">
            <thead>
              <tr>
                <th>Modelo do Veículo</th>
                <th>Marca</th>
                <th>Ano</th>
                <th>Preço R$</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {lista.map((carro) => {
                return (
                  <tr key={carro.modelo}>
                    <td>{carro.modelo}</td>
                    <td>{carro.marca}</td>
                    <td>{carro.ano}</td>
                    <td>{carro.preco}</td>
                    <td></td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default App;

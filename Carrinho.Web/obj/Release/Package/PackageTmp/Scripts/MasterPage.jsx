var MasterPage = React.createClass({
    render: function () {
        return (
            <div className="checkout-success">
                <br />
                <div className="success-icon text-center" width="32" height="32"></div>
                <h3 className="text-center">
                    <span>Seu pedido foi enviado com sucesso! Obrigado por comprar no Walmart</span>
                </h3>
                <h4 className="text-center">
                    <span>Número do pedido:</span>
                    <span className="green">m.OrderNumber</span>
                </h4>
                <br />
                <h3>
                    <span>Resumo do pedido:</span>
                </h3>

                <div className="panel panel-default">
                    <div className="panel-body">
                        <div className="row">
                            <div className="col-md-6">
                                <h4>
                                    <span>Número do pedido:</span>
                                    <span className="green">m.OrderNumber</span>
                                </h4>
                                <p>
                                    Atenção: Você receberá um e-mail com a confirmação e todos os detalhes do seu pedido. Por favor, verifique as configurações AntiSpam do seu provedor de e-mail.
                                </p>
                            </div>
                            <div className="col-md-6">
                                <h4>Forma de pagamento</h4>
                                <div className="boleto">
                                    <p><span className="glyphicon glyphicon-barcode"></span>Boleto bancário</p>
                                    <p className="offset30">m.Total</p>
                                </div>
                            </div>
                        </div>
                        <div className="row gray row-eq-height border-top border-bottom">
                            <div className="col-md-3">
                                <h4><span className="glyphicon glyphicon-user"></span>Seus dados</h4>
                                <p className="offset30">m.CustomerInfo.CustomerName</p>
                                <p className="offset30">m.CustomerInfo.PhoneNumber</p>
                            </div>
                            <div className="col-md-3 border-right">
                                <br />
                                <br />
                                <p>m.CustomerInfo.Email</p>
                            </div>
                            <div className="col-md-6">
                                <h4><span className="glyphicon glyphicon-home"></span>Endereço de entrega</h4>
                                <p className="offset30">m.CustomerInfo.DeliveryAddress</p>
                            </div>
                        </div>
                        <div className="row gray">
                            <div className="col-md-6">
                                <h4><span className="glyphicon glyphicon-gift"></span>Entrega</h4>
                            </div>
                            <div className="col-md-6">
                                <br />
                                <p className="float-right">
                                    Entrega em até
                                    m.DeliveryUpTo
                                </p>
                            </div>
                        </div>
                        <div className="row gray">
                            <div className="col-md-6">
                                <p className="offset30"><b>Descrição do produto</b></p>
                            </div>
                            <div className="col-md-6 pull-right">
                                <p><b className="float-right">Quantidade</b></p>
                            </div>
                        </div>







                            <div className="row gray">
                                <div className="col-md-6">
                                    <div className="offset30 truncate">
                                        <span>•</span>
                                        <span>item.Description</span>
                                    </div>
                                </div>
                                <div className="col-md-6 pull-right">
                                    <p className="float-right">item.Quantity</p>
                                </div>
                            </div>





                    </div>
                </div>

                <div className="row">
                    <div className="col-md-9"></div>
                    <a href="">
                        <div className="col-md-2">
                            <button type="button" className="btn btn-success">Voltar para lista de produtos</button>
                        </div>
                    </a>
                </div>

            </div>
      );
    }
});

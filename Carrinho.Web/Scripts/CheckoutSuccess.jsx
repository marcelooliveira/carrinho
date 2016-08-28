//IMPORTANT:
//==========
//I got support for jsx files through these updates:
//https://visualstudiogallery.msdn.microsoft.com/6edc26d4-47d8-4987-82ee-7c820d79be1d
//https://visualstudiogallery.msdn.microsoft.com/f3b504c6-0095-42f1-a989-51d5fc2a8459

var Panel = ReactBootstrap.Panel;
var Row = ReactBootstrap.Row;
var Column = ReactBootstrap.Col;
var Button = ReactBootstrap.Button;

var Reais = React.createClass({
    render: function () {
        var value = this.props.val;

        var d = value.toFixed(2).replace(/./g, function (c, i, a) {
            return i && c !== "." && ((a.length - i) % 3 === 0) ? ',' + c : c;
        });

        var r = d
        .replace(/\./g, "x")
        .replace(/,/g, ".")
        .replace(/x/g, ",");

        return <span>R$ {r}</span>;
    }
});

var CheckoutSuccessView = React.createClass({
    render: function () {
        return (
            <div>
                <br />
                <div className="success-icon text-center" width="32" height="32"></div>
                <h3 className="text-center">
                    <span>Seu pedido foi enviado com sucesso! Obrigado por comprar no Walmart</span>
                </h3>
                <h4 className="text-center">
                    <span>Número do pedido:</span>
                    <span className="green">{this.props.model.OrderNumber}</span>
                </h4>
                <br />
                <h3>
                    <span>Resumo do pedido:</span>
                </h3>

                <Panel>
                    <Row>
                        <Column md={6}>
                            <h4>
                                <span>Número do pedido:</span>
                                <span className="green">{this.props.model.OrderNumber}</span>
                            </h4>
                            <p>
                                Atenção: Você receberá um e-mail com a confirmação e todos os detalhes do seu pedido. Por favor, verifique as configurações AntiSpam do seu provedor de e-mail.
                            </p>
                        </Column>
                        <Column md={6}>
                            <h4>Forma de pagamento</h4>
                            <div className="boleto">
                                <p><span className="glyphicon glyphicon-barcode"></span>Boleto bancário</p>
                                <p className="offset30"><Reais val={this.props.model.Total}/></p>
                            </div>
                        </Column>
                    </Row>
                    <Row className="gray row-eq-height border-top border-bottom">
                        <Column md={3}>
                            <h4><span className="glyphicon glyphicon-user"></span>Seus dados</h4>
                            <p className="offset30">{this.props.model.CustomerInfo.CustomerName}</p>
                            <p className="offset30">{this.props.model.CustomerInfo.PhoneNumber}</p>
                        </Column>
                        <Column md={3} className="border-right">
                            <br />
                            <br />
                            <p>{this.props.model.CustomerInfo.Email}</p>
                        </Column>
                        <Column md={6}>
                            <h4><span className="glyphicon glyphicon-home"></span>Endereço de entrega</h4>
                            <p className="offset30">{this.props.model.CustomerInfo.DeliveryAddress}</p>
                        </Column>
                    </Row>
                    <Row className="gray">
                        <Column md={6}>
                            <h4><span className="glyphicon glyphicon-gift"></span>Entrega</h4>
                        </Column>
                        <Column md={6}>
                            <br />
                            <p className="float-right">
                                Entrega em até
                                {this.props.model.DeliveryUpTo}
                            </p>
                        </Column>
                    </Row>
                    <Row className="gray">
                        <Column md={6}>
                            <p className="offset30"><b>Descrição do produto</b></p>
                        </Column>
                        <Column md={6} className="pull-right">
                            <p><b className="float-right">Quantidade</b></p>
                        </Column>
                    </Row>
                    { this.props.model.CartItems.map(item =>
                        <Row className="gray">
                            <Column md={6}>
                                <div className="offset30 truncate">
                                    <span>•</span>
                                    <span>{item.Description}</span>
                                </div>
                            </Column>
                            <Column md={6} className="pull-right">
                                <p className="float-right">{item.Quantity}</p>
                            </Column>
                        </Row>
                            )
                    }
                </Panel>

                <Row>
                    <Column md={9}></Column>
                    <a href="/">
                        <Column md={2}>
                            <Button bsStyle="success">Voltar para lista de produtos</Button>
                        </Column>
                    </a>
                </Row>
            </div>
      );
    }
});

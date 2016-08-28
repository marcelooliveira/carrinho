var Panel = ReactBootstrap.Panel;
var Row = ReactBootstrap.Row;
var Column = ReactBootstrap.Col;
var Button = ReactBootstrap.Button;
var ButtonGroup = ReactBootstrap.ButtonGroup;

class Reais extends React.Component {
    render() {
        var value = this.props.val;

        var d = value.toFixed(2).replace(/./g, function (c, i, a) {
            return i && c !== "." && ((a.length - i) % 3 === 0) ? ',' + c : c;
        });

        var r = d
        .replace(/\./g, "x")
        .replace(/,/g, ".")
        .replace(/x/g, ",");

        return (<span>R$ {r}</span>);
    }
}

var CartItem = React.createClass({
    getInitialState: function () {
        var item = this.props.model;
        return {
            SKU: item.SKU,
            Description: item.Description,
            SoldAndDeliveredBy: item.SoldAndDeliveredBy,
            Price: item.Price,
            Quantity: item.Quantity,
            Subtotal: item.Subtotal
        };
    },
    updateState: function (change) {
        this.setState(Object.assign({}, this.state, change))
    },
    handleIncrement: function () {
        this.postQuantity(this.state.Quantity + 1);
    },
    handleDecrement: function () {
        this.postQuantity(this.state.Quantity - 1);
    },
    removeItem: function () {
        this.postQuantity(0);
    },
    postQuantity: function (quantity, callback) {
        $('.overlay').show();
        $.post('/api/Cart',
        {
            SKU: this.props.model.SKU,
            Quantity: quantity,
            Price: this.props.model.Price
        }).done(function (data) {
            $('.overlay').hide();
            for (var item of data.CartItems) {
                if (item.SKU == this.props.model.SKU) {
                    this.updateState({ Quantity: item.Quantity, Subtotal: item.Subtotal });
                    this.props.handleCartChange(data, item);
                    return;
                }
            }
        }.bind(this));
    },
    handleQuantityChanged: function (event) {
        var newQty = 1;
        var val = event.target.value;
        if (val && !isNaN(val))
            newQty = parseInt(val);
        this.postQuantity(newQty);
    },
    render: function () {
        return (
            <Row className="vertical-align">
                <Column md={6} className="justify-left">
                    <div className="row fullwidth">
                        <div className="col-md-3">
                            <img src="../Images/product.png" />
                        </div>
                        <div className="col-md-9">
                            <span>{this.state.Description}</span>
                            <span>{this.state.SoldAndDeliveredBy}</span>
                        </div>
                    </div>
                </Column>
                <Column md={2} className="green justify-center">
                    <Reais val={this.state.Price } />
                </Column>
                <Column md={2} className="justify-center">
                    <div className="text-center">
                        <ButtonGroup>
                            <input type="button" className="btn btn-default" value="-" onClick={this.handleDecrement} />
                            <input type="text" className="btn" value={this.state.Quantity} onChange={this.handleQuantityChanged } />
                            <input type="button" className="btn btn-default" value="+" onClick={this.handleIncrement} />
                        </ButtonGroup>
                        <a onClick={this.removeItem} className="remove pointer">Remover</a>
                    </div>
                </Column>
                <div className="col-md-2 green justify-right">
                    <Reais val={this.state.Subtotal} />
                </div>
            </Row>
        );
    }
})

class CartView extends React.Component {

    constructor(props) {
        super(props);
        this.state = {};
        var items = [];

        for (var i = 0; i < this.props.model.CartItems.length; i++) {
            var item = this.props.model.CartItems[i];
            items.push({
                SKU: item.SKU,
                Description: item.Description,
                SoldAndDeliveredBy: item.SoldAndDeliveredBy,
                Price: item.Price,
                Quantity: item.Quantity,
                Subtotal: item.Subtotal
            });
        }

        this.state = {
            canFinishOrder: true,
            items: items,
            Subtotal: this.props.model.Subtotal,
            DiscountRate: this.props.model.DiscountRate,
            DiscountValue: this.props.model.DiscountValue,
            Total: this.props.model.Total
        };
    }

    handleCartChange(cart, cartItem) {
        var newState = Object.assign({}, this.state, {
            Subtotal: cart.Subtotal,
            DiscountRate: cart.DiscountRate,
            DiscountValue: cart.DiscountValue,
            Total: cart.Total
        });
        if (cartItem.Quantity == 0) {
            newState.items.splice(newState.items.findIndex(i =>
                i.SKU == cartItem.SKU), 1);
        }
        this.setState(newState);
    }

    render() {
        const header = (<Row className="vertical-align">
                                    <Column md={6} className="justify-left">item(s)</Column>
                                    <Column md={2} className="justify-center">preço</Column>
                                    <Column md={2} className="justify-center">quantidade</Column>
                                    <Column md={2} className="justify-right">subtotal</Column>
                                </Row>);

        const body = (this.state.items.map(item =>
        {
            return <CartItem key={item.SKU} model={item}
                    handleCartChange={this.handleCartChange.bind(this)}/>;
            }
        ));

        const footer = (<Row>
                            <Column md={7}></Column>
                            <Column md={5} className="my-children-have-dividers">
                                <Row className="vertical-align">
                                    <Column md={8} className="justify-right">
                                        Subtotal ({Object.keys(this.state.items).length}&nbsp;ítens):
                                    </Column>
                                    <Column md={4} className="green justify-right">
                                        <span>
                                            <Reais val={this.state.Subtotal} />
                                        </span>
                                    </Column>
                                </Row>
                                { this.state.DiscountRate
                                ?
                                    <div className="row vertical-align">
                                        <Column md={8} className="justify-right">
                                            Desconto (<span>{this.state.DiscountRate}</span>%):
                                        </Column>
                                    <Column md={4} className="green justify-right">
                                        <span>
                                            <Reais val={this.state.DiscountValue} />
                                        </span>
                                    </Column>
                                </div>
                                    : null
                                }
                                <Row className="vertical-align">
                                    <Column md={12} className="justify-right">
                                    <h3>
                                        Valor total:&nbsp;
                                        <span className="green">
                                            <Reais val={this.state.Total} />
                                        </span>
                                    </h3>
                                    </Column>
                                </Row>
                            </Column>
                        </Row>);

        return (
                <div className="cart">
                    {
                        this.state.items.length == 0 ? null :
                        <div>
                        {/* TITLE */}
                        <h2>Meu carrinho ({ this.state.items.length } itens)</h2>

                        {/* CART PANEL */}
                        <Panel header={header} footer={footer}>
                            {body}
                        </Panel>
                        {/* CART PANEL */}

                        {/* NAVIGATION BUTTONS */}
                        <Row>
                            <Column className="pull-left">
                                {
                                    this.state.canFinishOrder
                                    ?
                                    <a href={this.props.urlNewProduct}>
                                        <button type="button" className="btn btn-success">Cadastrar novo produto</button>
                                    </a>
                                    : null
                                }
                            </Column>
                            <Column md={6}></Column>
                            <Column md={2} className="pull-right">
                                {
                                    this.state.canFinishOrder
                                    ?
                                    <a href={this.props.urlCheckoutSuccess}>
                                        <button type="button" className="btn btn-success">Finalizar compra</button>
                                    </a>
                                    : null
                                }
                            </Column>
                        </Row>
                        {/* NAVIGATION BUTTONS */}
                        </div>
                    }
                    {
                    this.state.items.length > 0
                    ? null
                    :
                        <div>
                            <h1><br /><br />:(</h1>
                            <div>
                                <h1>
                                    Ops! Seu carrinho está vazio.
                                </h1>
                                <br />
                                <div className="empty-cart-content-message">
                                    Cadastre novos produtos para continuar comprando.
                                </div>
                                <br />
                                <div>
                                    {
                                        this.state.canFinishOrder
                                        ?
                                        <a href={this.props.urlNewProduct}>
                                            <button type="button" className="btn btn-success">Cadastrar novo produto</button>
                                        </a>
                                        : null
                                    }
                                </div>
                            </div>
                        </div>
                    }
                </div>
      );
    }
}

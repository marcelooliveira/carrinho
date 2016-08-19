using Carrinho.Core.DTOs;
using System.Collections.Generic;

namespace Carrinho.Core
{
    public interface ICheckoutManager
    {
        CartDTO GetCart();
        void SaveCart(CartItemDTO modifiedItem);
        CartDTO GetCart(List<CartItemDTO> cartItems);
        List<CartItemDTO> CreateAndGetNewDataFile(string serverFilePath);
        CheckoutSummaryDTO GetCheckoutSummary();
    }
}
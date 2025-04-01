using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Entity
{
    public class Cart
    {
        public int CartId { get; set; }
        public string CustomerId { get; set; } = null!;
        public List<CartItem> CartItems { get; set; } = new();

        public void AddItem(Product product, int quantity)
        {
            var existingItem = CartItems.FirstOrDefault(i => i.ProductId == product.Id);
            if (existingItem != null)
            {
                existingItem.Quantity += quantity;
            }
            else
            {
                CartItems.Add(new CartItem 
                { 
                Product = product,
                Quantity = quantity, 
                });
            }
        }

        public void DeleteItem(int productId, int quantity)
        {
            var existingItem = CartItems.FirstOrDefault(i => i.ProductId == productId);
            if (existingItem != null)
            {
                existingItem.Quantity -= quantity;
                if (existingItem.Quantity <= 0)
                {
                    CartItems.Remove(existingItem);
                }
            }
            else return;
        }
        
    }


    public class CartItem
    {
        public int CartItemId { get; set; }
        public int ProductId { get; set; }
        public Product Product { get; set; } = null!;
        public int CartId { get; set; }
        public int Quantity { get; set; }
       
    }
}
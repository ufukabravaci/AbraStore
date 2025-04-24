using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.DTO;
using API.Entity;

namespace API.Extensions
{
    public static class OrderExtensions
    {
        public static IQueryable<OrderDTO> OrderToDTO(this IQueryable<Order> query)
        {
            return query.Select(i => new OrderDTO
            {
                Id = i.Id,
                CustomerId = i.CustomerId,
                FirstName = i.FirstName,
                LastName = i.LastName,
                Phone = i.Phone,
                AddresLine = i.AddresLine,
                City = i.City,
                DeliveryFree = i.DeliveryFree,
                OrderDate = i.OrderDate,
                OrderStatus = i.OrderStatus,
                SubTotal = i.SubTotal,
                OrderItems = i.OrderItems.Select(oi => new OrderItemDTO
                {
                    Id = oi.Id,
                    ProductName = oi.ProductName,
                    ProductId = oi.ProductId,
                    ProductImage = oi.ProductImage,
                    Price = oi.Price,
                    Quantity = oi.Quantity
                }).ToList()
            });
        }
    }
}
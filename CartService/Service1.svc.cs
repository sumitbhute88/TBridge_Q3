using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Serialization;
using System.ServiceModel;
using System.ServiceModel.Web;
using System.Text;
using static CartService.ShoppingCartDataContract;
using static CartService.Service1;

namespace CartService
{
    // NOTE: You can use the "Rename" command on the "Refactor" menu to change the class name "Service1" in code, svc and config file together.
    // NOTE: In order to launch WCF Test Client for testing this service, please select Service1.svc or Service1.svc.cs at the Solution Explorer and start debugging.
    public class Service1 : IService1
    {
        TestDbCartEntities DbCart;

        public Service1()
        {
            DbCart = new TestDbCartEntities();
        }

        public List<ShoppingCartDataContract.ItemDetails> GetItemDetails()
        {

            var query = (from a in DbCart.ItemDetails
                         select a).Distinct();


            List<ShoppingCartDataContract.ItemDetails> ItemDetailsList = new List<ShoppingCartDataContract.ItemDetails>();

            query.ToList().ForEach(rec =>
            {
                ItemDetailsList.Add(new ShoppingCartDataContract.ItemDetails
                {
                    Item_Name = rec.Item_Name,
                    Item_Description = rec.Item_Description,
                    Item_Price = Convert.ToString(rec.Item_Price),
                    Image_Name = rec.Image_Name
                });

            });

            return ItemDetailsList;
        }

        public bool addItem(ShoppingCartDataContract.ItemDetails itemDetails)
        {
            try
            {

                ItemDetail item = DbCart.ItemDetails.Create();
                item.Item_Name = itemDetails.Item_Name;
                item.Item_Description = itemDetails.Item_Description;
                item.Item_Price = Convert.ToInt32(itemDetails.Item_Price);
                item.Image_Name = itemDetails.Image_Name;
                DbCart.ItemDetails.Add(item);
                DbCart.SaveChanges();
            }
            catch (Exception ex)
            {
                throw new FaultException<string>
                     (ex.Message);
            }
            return true;
        }
    }
}

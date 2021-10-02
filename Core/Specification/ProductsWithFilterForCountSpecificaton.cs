using Core.Entities;

namespace Core.Specification
{
    public class ProductsWithFilterForCountSpecificaton : BaseSpecification<Product>
    {
        public ProductsWithFilterForCountSpecificaton(ProductSpecParams productParams) 
            : base(x => 
                (string.IsNullOrEmpty(productParams.Search) || x.Name.ToLower().Contains(productParams.Search)) && 
                (!productParams.BrandId.HasValue || x.ProductBrandId == productParams.BrandId) &&
                (!productParams.TypeId.HasValue  || x.ProductTypeId == productParams.TypeId)
            )
        {
        }
    }
}
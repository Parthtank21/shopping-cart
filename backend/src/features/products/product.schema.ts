import { z } from "zod";

const payload = {
  body: z.object({
    name: z
      .string({
        required_error: "Product name is required",
      })
      .trim()
      .min(3, "Product name should be at lease 3 characters long"),
    description: z
      .string({
        required_error: "Product description is required",
      })
      .trim()
      .min(20, "Product description should be at least 20 characters long"),
    price: z.number({
      required_error: "Price is required",
    }),
    image: z
      .string({
        required_error: "Product image is required",
      })
      .trim()
      .min(1, "Product image cannot be empty"),
  }),
};

const params = {
  params: z.object({
    id: z.string({
      required_error: "Product Id is required",
    }),
  }),
};

const queries = {
  query: z.object({
    page: z.string({
      required_error: "Page is required",
    }),
    limit: z.string({
      required_error: "limit is required",
    }),
  }),
};

export const addProductSchema = z.object({
  ...payload,
});

export const deleteProductSchema = z.object({
  ...params,
});

export const getAllProductsSchema = z.object({
  ...queries,
});

export type AddProductDto = z.infer<typeof addProductSchema>;
export type DeleteProductDto = z.infer<typeof deleteProductSchema>;
export type GetAllProductsDto = z.infer<typeof getAllProductsSchema>;

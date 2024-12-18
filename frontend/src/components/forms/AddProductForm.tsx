"use client";

import { z } from "zod";
import React from "react";
import { toast } from "sonner";
import { AxiosError } from "axios";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import { zodResolver } from "@hookform/resolvers/zod";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { addProduct } from "@/apis/product-apis";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

const formSchema = z.object({
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
  price: z.coerce
    .number({
      required_error: "Product price is required",
      invalid_type_error: "Product price must be a number",
    })
    .int()
    .positive()
    .min(1, "Pleae enter product price"),
  image: z
    .string({
      required_error: "Product image is required",
    })
    .trim()
    .min(1, "Product image cannot be empty"),
});

type FormSchemaDto = z.infer<typeof formSchema>;

const AddProductForm = () => {
  const router = useRouter();

  const form = useForm<FormSchemaDto>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      description: "",
      image: "",
      price: 0,
    },
  });

  const { isPending, mutate } = useMutation({
    mutationFn: addProduct,
    mutationKey: ["addProduct"],
    onSuccess: (data) => {
      toast.success(data.message);
      form.reset();
      router.push("/products");
    },
    onError: (error) => {
      if (error instanceof AxiosError) {
        if (error.response?.data.message === "zod-validation-error") {
          toast.error(error.response?.data.error[0].message);
        } else {
          toast.error(error.response?.data.message);
        }
      } else {
        toast.error(error.message);
      }
    },
  });

  function onSubmit(values: FormSchemaDto) {
    mutate(values);
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Product Name</FormLabel>
              <FormControl>
                <Input placeholder="Enter product name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="price"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Product Price</FormLabel>
              <FormControl>
                <Input placeholder="Enter product price" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Product Description</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Enter product description"
                  className="resize-none"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="image"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Product Image</FormLabel>
              <FormControl>
                <Input placeholder="Enter product image url" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="pt-3">
          <Button className=" w-full" type="submit" disabled={isPending}>
            Submit
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default AddProductForm;

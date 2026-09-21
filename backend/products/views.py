from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

from .models import Product, Order, OrderItem
from .serializers import ProductSerializer, OrderSerializer


class ProductList(APIView):

    def get(self, request):
        products = Product.objects.all()

        serializer = ProductSerializer(
            products,
            many=True
        )

        return Response(serializer.data)


class OrderCreate(APIView):

    def post(self, request):

        user = request.user

        if not user.is_authenticated:
            return Response(
                {"error": "You must be logged in to place an order."},
                status=status.HTTP_401_UNAUTHORIZED
            )

        items = request.data.get("items", [])
        shipping_address = request.data.get("shipping_address")
        phone = request.data.get("phone")

        if not items:
            return Response(
                {"error": "Order must contain at least one item."},
                status=status.HTTP_400_BAD_REQUEST
            )

        if not shipping_address or not phone:
            return Response(
                {"error": "Shipping address and phone are required."},
                status=status.HTTP_400_BAD_REQUEST
            )

        total_price = 0

        for item in items:

            product_id = item.get("product")
            quantity = item.get("quantity")

            try:
                product = Product.objects.get(id=product_id)
            except Product.DoesNotExist:
                return Response(
                    {"error": f"Product {product_id} does not exist."},
                    status=status.HTTP_400_BAD_REQUEST
                )

            total_price += product.price * quantity

        order = Order.objects.create(
            user=user,
            total_price=total_price,
            shipping_address=shipping_address,
            phone=phone
        )

        for item in items:

            product = Product.objects.get(id=item.get("product"))
            quantity = item.get("quantity")

            OrderItem.objects.create(
                order=order,
                product=product,
                quantity=quantity,
                price=product.price
            )

        serializer = OrderSerializer(order)

        return Response(
            serializer.data,
            status=status.HTTP_201_CREATED
        )
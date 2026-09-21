from django.urls import path

from .views import ProductList, OrderCreate


urlpatterns = [
    path("products/", ProductList.as_view()),
    path("orders/", OrderCreate.as_view()),
]
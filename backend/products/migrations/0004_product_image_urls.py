from django.db import migrations, models


IMAGE_URLS = {
    "iPhone": "https://cdn.corenexis.com/f/CT0WKlRTh6c.png",
    "Headphones": "https://cdn.corenexis.com/f/LCDp8JayIGZ.png",
    "OnePlus 13 5G": "https://cdn.corenexis.com/f/eDT7KYffgL7.jpg",
    "Samsung S26": "https://cdn.corenexis.com/f/Zuq3kCHfPIt.png",
}


def set_product_image_urls(apps, schema_editor):
    Product = apps.get_model("products", "Product")

    for name, image_url in IMAGE_URLS.items():
        Product.objects.filter(name=name).update(image=image_url)


def restore_local_image_paths(apps, schema_editor):
    Product = apps.get_model("products", "Product")
    local_paths = {
        "iPhone": "products/iphone.png",
        "Headphones": "products/head_phone.png",
        "OnePlus 13 5G": "products/OnePlus-13-5g.jpg",
        "Samsung S26": "products/Samsung_S26.png",
    }

    for name, image_path in local_paths.items():
        Product.objects.filter(name=name).update(image=image_path)


class Migration(migrations.Migration):

    dependencies = [
        ("products", "0003_order_orderitem"),
    ]

    operations = [
        migrations.AlterField(
            model_name="product",
            name="image",
            field=models.URLField(max_length=500),
        ),
        migrations.RunPython(
            set_product_image_urls,
            restore_local_image_paths,
        ),
    ]
from django.db import models
from django.contrib.auth.models import User

# Create your models here.
    
class Book(models.Model):
    """Information about books"""
    title = models.CharField(max_length=100, default='')
    author = models.CharField(max_length=100, default='')
    picture = models.CharField(max_length=100, default='')
    description = models.CharField(max_length=700, default='')
    date = models.CharField(max_length=100, default='')
    genre1 = models.CharField(max_length=100, default='')
    genre2 = models.CharField(max_length=100, default='')
    available = models.CharField(max_length=100, default='')
    
class Wishlist(models.Model):
    """shows which book User has in wishist"""
    User = models.ForeignKey(User, on_delete=models.CASCADE)
    Book = models.ForeignKey(Book, on_delete=models.CASCADE)
    
class Borrow(models.Model):
    """Shows which Book is borrowed by which User"""
    User = models.ForeignKey(User, on_delete=models.CASCADE)
    Book = models.ForeignKey(Book, on_delete=models.CASCADE)

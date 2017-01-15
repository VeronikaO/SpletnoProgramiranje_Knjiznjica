from django.shortcuts import render
from django.http import HttpResponseRedirect
from django.urls import reverse
from django.utils.translation import activate
from django.contrib.auth.models import User

from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.decorators import login_required, permission_required

import sys

from .forms import LoginForm, RegisterForm
from .models import Book
# Create your views here.
app_name = 'SPK'

def index(request):
  """
  The landing page
  
  This is the landing page of your app. You can login or register as a user.
  
  Keyword arguments:
  request -- the django requst object
  """
  context = {'loginForm':LoginForm()}
  if request.method=='POST':
    form = LoginForm(request.POST)
    form2 = RegisterForm(request.POST)
    if form.is_valid():
      user = authenticate(username=form.cleaned_data['Username'], password=form.cleaned_data['Password'])
      if user is not None:
        login(request, user)
      #  context['username'] = user
      #context['username'] = form.cleaned_data['username']
    if form2.is_valid():
      user = User.objects.create_user(form.cleaned_data['Username'], form.cleaned_data['Email'], form.cleaned_data['Password'])
      user.save()
      login(request, user)
  else: 
    form = LoginForm()
    form2 = RegisterForm()
  context['loginForm'] = form
  context['registerForm'] = form2
  #sys.stderr.write(context['user'])
  return render(request, 'SPK/index.html', context)


"""
User logout
Logs user out and returns to landing page.
"""
def logout_user(request):
  logout(request)
  return HttpResponseRedirect(reverse('index'))

@login_required(login_url='/SPK/')
def book_main(request):
    """
    Main page of the library
    Loads all the available books
    """
    book_list = Book.objects.all()
    context ={'books_list' : book_list}
    return render(request, 'SPK/main.html', context)

def book_filter(request, filter):
    """
    Filters books by genres
    """
    genre = filter
    book_list = Book.objects.all()
    book_filter1 = Book.objects.get(genre1=filter) 
    book_filter2 = Book.objects.get(genre2=filter)
    context ={'books_filter':book_list, 'genre':genre}
    return render(request, 'SPK/main_filter.html', context)

def book_page(request, book_title):
    """
    Creates single book page
    """
    book = Book.objects.get(title=book_title)
    context ={'book_obj' : book}
    return render(request, 'SPK/book.html', context)

def legal(request):
    return render(request, 'SPK/legal.html')

def about(request):
    return render(request, 'SPK/about.html')

def sitemap(request):
    return render(request, 'SPK/sitemap.html')

def wishlist(request):
    """
    Creates users wishlist
    """
    return render(request, 'SPK/wishlist.html')
    
def checkout(request):  
    """
    Creates users checkout page
    """
    return render(request, 'SPK/checkout.html')










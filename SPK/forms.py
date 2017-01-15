from django import forms
from django.utils.translation import ugettext_lazy as _
from .models import Borrow, Book

class LoginForm(forms.Form):
  Username = forms.CharField(label=_('Username'), max_length=100, localize=True)
  Password = forms.CharField(label=_('Password'), max_length=100, widget=forms.PasswordInput, localize=True)
  
  
class RegisterForm(forms.Form):
   Username = forms.CharField(label=_('Username'), max_length=100, localize=True)
   Password = forms.CharField(label=_('Password'), max_length=100, widget=forms.PasswordInput, localize=True)
   Confirmpassword = forms.CharField(label=_('Confirm Password'), max_length=100, widget=forms.PasswordInput, localize=True)
   Name = forms.CharField(label=_('Name'), max_length=100, localize=True)
   Email = forms.CharField(label=_('Email'), max_length=100, localize=True)
   
#class BorrowForm(forms.ModelForm):
#  class Meta:
#    model = Borrow
#    fields = ['title', 'content', 'pub_date']
    
    

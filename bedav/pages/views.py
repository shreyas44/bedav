from django.shortcuts import render

# Create your views here.

def main_view(request, *args, **kwargs):
  return render(request, 'pages/index.html', {})

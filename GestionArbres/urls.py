from django.urls import path
from . import views

urlpatterns = [
    path('', views.getAccueil, name='accueil'),
    path('getData/', views.getData, name='getting_data'),
    path('getTreeInfo/<int:id_arbre>', views.getTreeData, name='getting_tree')
]
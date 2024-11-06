from django.shortcuts import render, get_object_or_404
from django.contrib.gis.db import models
from django.core.serializers import serialize
from django.http import HttpResponse, JsonResponse
from .models import Arbre


# Create your views here.
def getAccueil(request):
    """Retourne la page d'accueil"""

    context = {"nom": "Projet Web Mapping"}

    return render(request, "GestionArbres/index.html", context=context)


def getData(request):
    """Récupérer toutes les données de la base de données"""

    # Retour du résultat au client
    return JsonResponse(data=serialize('geojson', Arbre.objects.all()), safe=False)


def getTreeData(request, id_arbre):
    """
    Récupérer les détails d'un arbre donné
    """
    arbre = get_object_or_404(Arbre, id_arbre=id_arbre)
    return render(request, "GestionArbres/tablePopUp.html", context={"arbre": arbre})
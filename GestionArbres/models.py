from django.contrib.gis.db import models
# Create your models here.


class Arbre(models.Model):
    """
    Classe pour représenter un arbre donné
    """
    id_arbre = models.BigAutoField(primary_key=True)
    espece = models.CharField(verbose_name="Nom de l'espèce", max_length=100, null=True, blank=True)
    age = models.IntegerField(verbose_name="Age de l'arbre", null=True, blank=True)
    circonferance = models.FloatField(verbose_name="Circonférance (cm)", null=True, blank=True)
    hauteur = models.FloatField(verbose_name="Hauteur (m)", null=True, blank=True)
    geometrie_arbre = models.MultiPointField(srid=4326)

    def __str__(self):
        return "Arbre " + str(self.id_arbre) + " : " + str(self.espece) + f"({str(self.age)} ans)"
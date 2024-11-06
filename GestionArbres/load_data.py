from pathlib import Path
from django.contrib.gis.utils import LayerMapping
from .models import Arbre

arbre_mapping = {
    "id_arbre": "code",
    "espece": "espece",
    "age": "age",
    "circonferance": "circonf",
    "hauteur": "hauteur",
    "geometrie_arbre": "Polygon"
}

shp_arbres = Path(__file__).resolve().parent.parent.parent / "Data" / "arbres.shp"

models = [Arbre]
fichiers = [shp_arbres]
mappings = [arbre_mapping]


def run(verbose=True):
    for i in range(len(models)):
        lm = LayerMapping(models[i], fichiers[i], mappings[i], transform=False)
        lm.save(strict=True, verbose=verbose)


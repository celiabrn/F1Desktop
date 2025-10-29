#-------------------------------------------------------------------------------
# Name:        module1
# Purpose:
#
# Author:      celia
#
# Created:     22/10/2024
# Copyright:   (c) celia 2024
# Licence:     <your licence>
#-------------------------------------------------------------------------------

import xml.etree.ElementTree as ET

def obtenerPuntos(nombreXML, cotaMaxAltura):
    """Función que obtiene las coordenadas de los tramos del circuito a partir
    del xml"""
    try:
        arbol = ET.parse(nombreXML)

    except IOError:
        print ('No se encuentra el archivo ', nombreXML)
        exit()

    except ET.ParseError:
        print("Error procesando en el archivo XML = ", nombreXML)
        exit()

    raiz = arbol.getroot()

    pInicio = "0 "+str(cotaMaxAltura)+", "
    puntos =pInicio
    distancia = 0.

    # Recorrido de los tramos del árbol
    for hijo in raiz.findall('.//{http://www.uniovi.es}tramos/*'): # Expresión Path
        altitud = (float(hijo.find("./{http://www.uniovi.es}coordenada").get("altitud")) -400)/ 3
        distancia+= float(hijo.find("./{http://www.uniovi.es}distancia").text) / 3
        print(distancia)

        puntos += str(distancia)+" "+str(altitud)+", "

    puntosLista = puntos.split(' ')

    pFin = puntosLista[len(puntosLista)-3].strip(" ")

    puntos += ""+pFin+" "+str(cotaMaxAltura)+", "
    puntos += pInicio.strip(", ")

    return puntos

""" Escribe en el archivo de salida el prólogo del archivo SVG"""
def prologoSVG(archivo):
    archivo.write('<?xml version="1.0" encoding="UTF-8" ?>\n')
    archivo.write('<svg xmlns="http://www.w3.org/2000/svg" version="2.0" height = "400" width = "5000">\n')
    archivo.write('<polyline points=')


""" Escribe en el archivo de salida el epílogo del archivo SVG"""
def epilogoSVG(archivo):
    archivo.write('style="fill:white;stroke:red;stroke-width:5" />\n')
    archivo.write('</svg>\n')


def main():
    nombreXML = input('Introduzca el nombre del archivo XML = ')
    nombreSVG = input('Introduzca el nombre del archivo SVG = ')

    try:
        salida = open(nombreSVG + ".svg",'w')
    except IOError:
        print ('No se puede crear el archivo ', nombreSVG + ".svg")
        exit()

    prologoSVG(salida)

    salida.write('"'+obtenerPuntos(nombreXML, 200)+'"\n')

    epilogoSVG(salida)

    salida.close()


if __name__ == "__main__":
    main()

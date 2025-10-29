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

class Kml(object):
    """
    Genera archivo KML con puntos y líneas
    @version 1.0 17/Noviembre/2023
    @author: Juan Manuel Cueva Lovelle. Universidad de Oviedo
    """
    def __init__(self):
        """
        Crea el elemento raíz y el espacio de nombres
        """
        self.raiz = ET.Element('kml', xmlns="http://www.opengis.net/kml/2.2")
        self.doc = ET.SubElement(self.raiz,'Document')

    def addLineString(self,nombre,extrude,tesela, listaCoordenadas, modoAltitud, color, ancho):
        """
        Añade un elemento <Placemark> con líneas <LineString>
        """
        ET.SubElement(self.doc,'name').text = '\n' + nombre + '\n'
        pm = ET.SubElement(self.doc,'Placemark')
        ls = ET.SubElement(pm, 'LineString')
        ET.SubElement(ls,'extrude').text = '\n' + extrude + '\n'
        ET.SubElement(ls,'tessellation').text = '\n' + tesela + '\n'
        ET.SubElement(ls,'coordinates').text = '\n' + listaCoordenadas + '\n'
        ET.SubElement(ls,'altitudeMode').text = '\n' + modoAltitud + '\n'

        estilo = ET.SubElement(pm, 'Style')
        linea = ET.SubElement(estilo, 'LineStyle')
        ET.SubElement (linea, 'color').text = '\n' + color + '\n'
        ET.SubElement (linea, 'width').text = '\n' + ancho + '\n'

    def escribir(self,nombreArchivoKML):
        """
        Escribe el archivo KML con declaración y codificación
        """
        arbol = ET.ElementTree(self.raiz)
        arbol.write(nombreArchivoKML, encoding='utf-8', xml_declaration=True)

    def ver(self):
        """
        Muestra el archivo KML. Se utiliza para depurar
        """
        print("\nElemento raiz = ", self.raiz.tag)

        if self.raiz.text != None:
            print("Contenido = "    , self.raiz.text.strip('\n')) #strip() elimina los '\n' del string
        else:
            print("Contenido = "    , self.raiz.text)

        print("Atributos = "    , self.raiz.attrib)

        # Recorrido de los elementos del árbol
        for hijo in self.raiz.findall('.//'): # Expresión XPath
            print("\nElemento = " , hijo.tag)
            if hijo.text != None:
                print("Contenido = ", hijo.text.strip('\n')) #strip() elimina los '\n' del string
            else:
                print("Contenido = ", hijo.text)
            print("Atributos = ", hijo.attrib)

def obtenerCoordenadas(nombreXML):
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

    coordenadas = ""
    # Recorrido de las coordenadas del árbol
    #Obtenemos las coordenadas del centro
    coordCentro =raiz.find('.//{http://www.uniovi.es}coordenada')
    coordenadas+= ""+coordCentro.get("longitud")+","+coordCentro.get("latitud")+",0.0\n"

    #Obtenemos las coordenadas de fin de cada uno de los tramos
    for hijo in raiz.findall('.//{http://www.uniovi.es}tramos/*/{http://www.uniovi.es}coordenada'): # Expresión Path
        coordenadas+= ""+hijo.get("longitud")+","+hijo.get("latitud")+",0.0\n"
    return coordenadas.strip()

def main():

    print(Kml.__doc__)

    nombreXML = input('Introduzca el nombre del archivo XML = ')

    nombreKML = input('Introduzca el nombre del archivo KML = ')


    nuevoKML = Kml()

    coordenadasCircuito = obtenerCoordenadas(nombreXML)

    nuevoKML.addLineString("Circuito Red Bull Ring","1","1",
                           coordenadasCircuito,'relativeToGround',
                           '#ff0000ff',"5")

    """Visualización del KML creado"""
    nuevoKML.ver()

    """Creación del archivo en formato KML"""
    nuevoKML.escribir(nombreKML)
    print("Creado el archivo: ", nombreKML)

if __name__ == "__main__":
    main()

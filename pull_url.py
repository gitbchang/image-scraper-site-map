from lxml import etree
from io import StringIO, BytesIO
import csv

filename = 'FINAL_justproducts2.xml'
file = open(filename, encoding='utf-8')
feed = etree.parse(file)
root = feed.getroot()
client_instance = "sunextools"
write_csv_url = []

# insert namespace before each tag in xpath query
namespace = '{' + root.nsmap[None] + '}'

all_urls = root.findall('.//' + namespace + 'url/' + namespace + 'loc')

seeTree = etree.tostring(root)
test = etree.tostring(all_urls[0])

for url in all_urls:
  write_csv_url.append(url.text)

write_csv_name = client_instance + "extracted_urls.csv"

"""
If CSV already created, delete first

Does not overwrite file - will append
"""
with open(write_csv_name, 'a') as resultFile:
  for url in write_csv_url:
    resultFile.write(url+"\n")
    


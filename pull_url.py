from lxml import etree as ET
import csv

filename = 'FINAL_justproducts2.xml'
file = open(filename, encoding='utf-8')
feed = ET.parse(file)
root = feed.getroot()
namespace = '{' + root.nsmap[None] + '}'
# print(namespace)



all_urls = root.find('.//' + namespace + 'url')
# all_loc = all_urls.findall('.//' + namespace + 'loc')
for loc in all_urls:
  targetUrl = loc.find('.//' + namespace + 'loc')
  print(targetUrl)

for k, v in all_urls.items():
  print(k, v)

# print(all_urls.items())
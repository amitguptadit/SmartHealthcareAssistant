# !/usr/bin/env python
import sys
import os
import Adafruit_DHT
import time
import paho.mqtt.client as paho
import os
import json
import time
from datetime import datetime

# from flask import Flask,  flash,request, redirect, render_template,abort, jsonify, send_from_directory, send_file
# from flask import jsonify
import string
sys.path.append(os.getcwd()[:os.getcwd().index('com')])

# ######################################
# CREATE MQTT Publisher for reading data from DHT11 sensor in raspberry PI
# The Class PatientHealthCareAnalytics.
# @author Amit Gupta
# ######################################


class PatientHealthCareAnalytics:
    message_broker = "localhost"
    port = 1883  # MQTT data listening port
    ACCESS_TOKEN = 'ACCESS_CODE'
    patient_id = 'AO001'

    def on_publish(client, userdata, result):
        print("published data is : ")
    pass

    clientObj = paho.Client(patient_id)
    clientObj.on_publish = on_publish
    clientObj.username_pw_set(ACCESS_TOKEN)
    clientObj.connect(message_broker, port, keepalive=60)  # Establishing connection

    def __init__(self):
        print('init')
        pass

    def get_patient_temperature(self, dht_sensor, dht_pin):
        """ GET PATIENT DATA' .
        Parameters:
            self :Default.
            dht_sensor :DHT_SENSOR.
            dht_pin : DHT_PIN.
        Returns: ''
        """
        try:
            print('[ GET Patient Temperature ]');
            ## response = jsonify({'timestamp': 400,'metrics': [{'name':'patientId','value':'test'}],'seq': '2'})
            seq=0;
            while True:
                hm, temperature = Adafruit_DHT.read(dht_sensor, dht_pin)
                if hm is not None and temperature is not None:
                    # temp = "{0: 0.1f}C".format(temperature+10, hm)
                    temp = "{0: 0.1f}C".format(temperature, hm)
                    temp = float(temp[:-1]);
                    degree = int(round(temp))
                    # fahrenheit
                    temp = str((degree * 1.8) + 32);
                    print('Patient Temperature F is :', temp)
                    seq=seq+1
                    # timestamp = time.strptime("%m/%d/%Y %H:%M")
                    timestamp = str(time.time());
                    # response = jsonify({'timestamp': 400,'metrics': [{'name': 'patientId', 'value': temp}], 'seq': '2'})

                    patient_id = "AA001";
                    # payload = '{"timestamp": 1678505905.9044406,"metrics": [{"name": "patientI","timestamp": 1678505905.9044406,"dataType": "Float", "value": 77.0}],"seq":89}'
                    payload = '{"timestamp": '+timestamp+',"metrics": [{"patientId": "'+patient_id+'","timestamp": '+timestamp+',"dataType": "Float", "temperature": '+temp+'}],"seq":'+str(seq)+'}'

                    # payload_data = bytearray(payload.SerializeToString())
                    # ret = self.clientObj.publish("test", payload)  # topic name is test
                    ret = self.clientObj.publish("test", payload)  # topic name is test
                    ret = self.clientObj.publish("spBv1.0", payload)  # topic name is spBv1.0

                    # "spBv1.0/myGroupId/DCMD/myNodeName/#"
                    # spBv1.0/myGroupId/DDATA/myNodeName/#
                    print(temp);
                    print("Load data  \n")
                    # 5 seconds
                    time.sleep(5)
                    # 30 minuts = 30x60
                    # time.sleep(1800)
                else:
                    print("Sensor failure. Check wiring.");
                    print(Adafruit_DHT.read(DHT_SENSOR, DHT_PIN))
                time.sleep(3);
            pass
        except Exception as ex:
            print("Exception get_patient_temprature: ", ex)
            return 'fail'
    pass

# ####[ main method ]##########


def main():
    """ main method.
    """
    analytics.get_patient_temperature(DHT_SENSOR,DHT_PIN);
    pass


DHT_SENSOR = Adafruit_DHT.DHT11
DHT_PIN = 4
analytics = PatientHealthCareAnalytics()

if __name__ == '__main__':
    main()


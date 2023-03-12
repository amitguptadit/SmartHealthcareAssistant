# !/usr/bin/env python
import sys
import paho.mqtt.client as paho
import os
import json
import csv
import time
from datetime import datetime
# from flask import Flask,  flash,request, redirect, render_template,abort, jsonify, send_from_directory, send_file
# from flask import jsonify
sys.path.append(os.getcwd()[:os.getcwd().index('com')])

# ######################################
# CREATE MQTT Subscriber for subscriber data from MQTT message broker topic
# The Class PatientMQTTSubscriber.
# @author Amit Gupta
# ######################################


class PatientMQTTSubscriber:
    cnt = 0
    def __init__(self):
        print('init')
        pass

    def write_csv(self,timestamp,patientId,temperature,seq):
        """ SUBSCRIBE PATIENT DATA' .
        Parameters:
            self :Default.
            message_broker :message_broker.
            port : port.
        Returns: ''
        """
        try:
            print('[ WRITE PATIENT DATA IN CSV ]');
            patient_data_dict={};
            patient_data_dict['timestamp']=timestamp;
            patient_data_dict['patientId'] = patientId;
            patient_data_dict['temperature'] = temperature;
            patient_data_dict['seq'] = seq;
            patient_data = [patient_data_dict]
            # field names
            fields = ['timestamp', 'patientId', 'temperature', 'seq']
            # name of csv file
            filename = "patient_records.csv"
            # timestamp,patientId,temperature,seq
            # writing to csv file
            with open(filename, 'a',newline='') as csvfile:
                writer = csv.DictWriter(csvfile, fieldnames=fields)
                if self.cnt==0:
                    writer.writeheader()
                print("counter",self.cnt);
                # writing patient data
                writer.writerows(patient_data)
            pass
        except Exception as ex:
            print("Exception CSV write: ", ex)
            return 'fail'
    pass

    def read_csv(self,filename):
        """ READ PATIENT DATA' .
        Parameters:
            self :Default.
            message_broker :message_broker.
            port : port.
        Returns: ''
        """
        try:
            print('[ READ PATIENT DATA IN CSV ]');
            # opening the CSV file
            with open(filename, mode='r')as file:
                # reading the CSV file
                csvFile = csv.reader(file)
                # displaying the contents of the CSV file
                for lines in csvFile:
                    print(lines)
            pass
        except Exception as ex:
            print("Exception CSV write: ", ex)
            return 'fail'
    pass

    def on_message(self,client, userdata, message):
      print("received data is :")
      # print(str(message.payload.decode("utf-8")) ) #printing Received message
      data = str(message.payload.decode("utf-8"));
      data_dict = json.loads(str(data));
      # Receiving MQTT messages
      print(data_dict);
      # print(data_dict['metrics']);
      # print(type(data_dict['metrics']));
      print(data_dict['metrics'][0]['temperature']);
      timestamp = str(data_dict['metrics'][0]['timestamp'])
      patient_id = str(data_dict['metrics'][0]['patientId'])
      temperature = str(data_dict['metrics'][0]['temperature'])
      seq = str(data_dict['seq'])
      self.write_csv(timestamp,patient_id,temperature,seq)
      self.cnt = self.cnt+1
      print('written data in csv files');
    pass

    def subscribe_topic(self, message_broker, port):
        """ SUBSCRIBE PATIENT DATA' .
        Parameters:
            self :Default.
            message_broker :message_broker.
            port : port.
        Returns: ''
        """
        try:
            print('[ MESSAGE BROKER SUBSCRIBE PATIENT DATA TOPIC ]');
            client = paho.Client("user")  # create client object
            client.on_message = self.on_message
            client.connect(message_broker, port)  # connection establishment with broker
            print("[ Waiting for MQTT Messages ]")
            client.subscribe(topic)  # subscribe topic test
            while 1:
                client.loop_start()
            pass
        except Exception as ex:
            print("Exception subscribe_topic: ", ex)
            return 'fail'
    pass

# ####[ main method ]##########


def main():
    """ main method.
    """
    message_broker = "192.168.1.4"  # Message Broker HOST NAME
    port = 1883
    analytics.subscribe_topic(message_broker,port);
    pass


ACCESS_TOKEN = 'ACCESS_CODE'
patient_id = 'AO001'
# topic = "spBv1.0"
topic = "test"
analytics = PatientMQTTSubscriber()

if __name__ == '__main__':
    main()


# !/usr/bin/env python
import sys
import paho.mqtt.client as paho
import os
import json
import time
from datetime import datetime
# from flask import Flask,  flash,request, redirect, render_template,abort, jsonify, send_from_directory, send_file
# from flask import jsonify
sys.path.append(os.getcwd()[:os.getcwd().index('com')])

# ######################################
# CREATE SparkPlug B Service for Send & Receive MQTT Sparkplug B Messages
# The Class MQTTSparkPlugBService.
# @author Amit Gupta
# ######################################


class MQTTSparkPlugBService:
    message_broker = "192.168.1.7"  # host name
    port = 1883  # MQTT data listening port
    ACCESS_TOKEN = 'ACCESS_CODE'
    patient_id = 'AO001'
    topic = "spBv1.0"

    def __init__(self):
        print('init')
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
            pass
        except Exception as ex:
            print("Exception get_patient_temprature: ", ex)
            return 'fail'
    pass

# ####[ main method ]##########


def main():
    """ main method.
    """
    analytics.subscribe_topic(message_broker,port);
    pass


analytics = MQTTSparkPlugBService()

if __name__ == '__main__':
    main()


build:
	python setup.py sdist

api:
	python brewkit/api/server.py

install: build
	pip install dist/*

uninstall:
	pip uninstall -y brewkit

version:
	pip list | grep brewkit

clean:
	rm -rf dist/*

test:
	python -m pytest $(the)

install_deps:
	pip install -r requirements.txt

ec2:
	ssh -i "brewkit.pem" ubuntu@ec2-34-218-78-196.us-west-2.compute.amazonaws.com

build:
	python setup.py sdist

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

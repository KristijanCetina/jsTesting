.PHONY: all clean

OUTPUT = DiplomskiRad-KristijanCetina.pdf
FILES =  DiplomskiRad-KristijanCetina

$(OUTPUT): $(FILES).tex
	@echo "Building $(OUTPUT)"
	@# 2 puta da bi sadržaj bio ažuran + literatura:
	@pdflatex $(FILES).tex > /dev/null
	@bibtex $(FILES).aux > /dev/null
	@pdflatex $(FILES).tex > /dev/null
	@echo "$(OUTPUT) created"
	
clean:
	@$(RM) -f *.dvi *.log *.aux *.swp *.swo *.toc *.idx *.lof *.out *.bbl *.blg *.fls *.out *.fdb_latexmk *..synctex.gz

wipe:
	@$(RM) -f *.dvi *.log *.aux *.swp *.swo *.toc *.idx *.lof *.out *.bbl *.blg *.fls *.out *.fdb_latexmk *..synctex.gz $(OUTPUT)

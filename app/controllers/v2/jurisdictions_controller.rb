class V2::JurisdictionsController < ApplicationController
  before_action :set_v2_jurisdiction, only: %w[ show edit update destroy ]

  # GET /v2/jurisdictions
  # GET /v2/jurisdictions.json
  def index
    @v2_jurisdictions = V2::Jurisdiction.all
  end

  # GET /v2/jurisdictions/1
  # GET /v2/jurisdictions/1.json
  def show
  end

  # GET /v2/jurisdictions/new
  def new
    @v2_jurisdiction = V2::Jurisdiction.new
  end

  # GET /v2/jurisdictions/1/edit
  def edit
  end

  # POST /v2/jurisdictions
  # POST /v2/jurisdictions.json
  def create
    @v2_jurisdiction = V2::Jurisdiction.new(v2_jurisdiction_params)

    respond_to do |format|
      if @v2_jurisdiction.save
        format.html { redirect_to @v2_jurisdiction, notice: "Jurisdiction was successfully created." }
        format.json { render :show, status: :created, location: @v2_jurisdiction }
      else
        format.html { render :new, status: :unprocessable_entity }
        format.json { render json: @v2_jurisdiction.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /v2/jurisdictions/1
  # PATCH/PUT /v2/jurisdictions/1.json
  def update
    respond_to do |format|
      if @v2_jurisdiction.update(v2_jurisdiction_params)
        format.html { redirect_to @v2_jurisdiction, notice: "Jurisdiction was successfully updated." }
        format.json { render :show, status: :ok, location: @v2_jurisdiction }
      else
        format.html { render :edit, status: :unprocessable_entity }
        format.json { render json: @v2_jurisdiction.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /v2/jurisdictions/1
  # DELETE /v2/jurisdictions/1.json
  def destroy
    @v2_jurisdiction.destroy
    respond_to do |format|
      format.html { redirect_to v2_jurisdictions_url, notice: "Jurisdiction was successfully destroyed." }
      format.json { head :no_content }
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_v2_jurisdiction
      @v2_jurisdiction = V2::Jurisdiction.find(params[:id])
    end

    # Only allow a list of trusted parameters through.
    def v2_jurisdiction_params
      params.require(:v2_jurisdiction).permit(:name)
    end
end

import logging


from flask import  request, jsonify ,Blueprint
from back.dal.elastic.dal_employees_elastic import Queries
from pydantic import BaseModel

from back.logic.employee_logic import EmployeeLogic
from back.utils.middleware import verify

employee_bp = Blueprint('employee', __name__)

q = Queries()
employee_logic=EmployeeLogic()


class EmployeeModel(BaseModel):
    id: int
    name: str
    role: str
    salary: float
    isBonus: bool


@employee_bp.route("/addEmployee", methods=["POST"])
def add_employee_route():
    if not verify():
        return jsonify({"status": "error", "message": "No permission"})
    body = request.get_json()
    res=employee_logic.inset_employee(body)
    return res
    # res=q.add_employee(body)


@employee_bp.route("/getEmployees", methods=["GET"])
def get_employees_route():

    employees = []

    if not verify():
        return jsonify({"status": "error", "message": "No permission"})
    res = q.get_employees()
    for hit in res['hits']['hits']:
        employees.append(hit['_source'])
    return employees

@employee_bp.route("/getEmployee/<employeeId>", methods=["GET"])
def get_employee_route(employeeId):
    try:
        if not verify():
            return jsonify({"status":"error","message":"No permission"})
        res=q.get_employee(employeeId)
        return res
    except Exception as e:
        logging.error(f"Failed to get employee {employeeId}: {e}")
        return jsonify({"status": "error", "message": str(e)}), 500

@employee_bp.route("/deleteEmployee/<employeeId>", methods=["DELETE"])
def delete_employee_route(employeeId):
    try:
        if not verify():
            return jsonify({"status": "error", "message": "No permission"})
        q.delete_employee(employeeId)
        return jsonify({"status": "success", "deleted_id": employeeId})
    except Exception as e:
        logging.error(f"Failed to delete employee {employeeId}: {e}")
        return jsonify({"status": "error", "message": str(e)}), 500



@employee_bp.route("/updateEmployee", methods=["PUT"])
def update_employee_route():
    try:
        if not verify():
            return jsonify({"status": "error", "message": "No permission"})
        body = request.get_json()

        q.update_employee(body)
        return jsonify({"status": "success", "updated_id": body['id']})
    except Exception as e:
        logging.error(f"Failed to delete employee {body['id']}: {e}")
        return jsonify({"status": "error", "message": str(e)}), 500



@employee_bp.route('/verify' , methods=["GET"])
def check_verify():
    try:
        if not verify():
            return jsonify({"status": "error", "message": "No permission"})
        else:
            return jsonify({"status": "success", "message": "Have permission"})

    except Exception as e:
        return jsonify({"status": "error", "message": str(e)}), 500





